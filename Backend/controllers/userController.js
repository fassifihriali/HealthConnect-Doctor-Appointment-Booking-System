import validator from 'validator'
import bycrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
// import razorpay from 'razorpay'
import Stripe from 'stripe'

const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        if (!name || !email || !password) {
            return res.json({success:false, message:"Missing Details"})
        }
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Enter a valid email"})
        }
        if (password.length<8) {
            return res.json({success:false, message:"Enter a strong password"})
        }
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password,salt)
        const userData = {
            name,
            email,
            password:hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success:false, message:'User soes not exist'})
        }
        const isMatch = await bycrypt.compare(password,user.password)
        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const getProfile = async(req,res)=>{
    try {
        // const {userId} = req.body
        const userId = req.user.id 
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const updateProfile = async (req,res) =>{
    try {
        const userId = req.user.id   // ✅ prendre depuis authUser
        const { name, phone, address, dob, gender } = req.body
        // const {userId, name, phone, address, dob, gender} = req.body
        const imageFile = req.file
        if (!name || !phone || !dob || !gender) {
            return res.json({success:false,message:"Data missing"})
        }
        // Gérer address (string ou objet)
        let parsedAddress = address
        if (typeof address === "string") {
            try {
                parsedAddress = JSON.parse(address)
            } catch {
                return res.json({success:false, message:"Invalid address format"})
            }
        }
        // //////
        await userModel.findByIdAndUpdate(userId,{
            name,
            phone,
            address: parsedAddress,
            dob,
            gender
        })
        // await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type :'image'})
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }
        res.json({success:true,message:"Profile Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const bookAppointment = async (req,res) =>{
    try {
        const userId = req.user.id   // ✅ récupérer depuis le token
        const { docId, slotDate, slotTime } = req.body
        // const {userId, docId, slotDate, slotTime} = req.body
        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData.available) {
            return res.json({success:false,message:'Doctor not available'})
        }
        let slots_booked = docData.slots_booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false,message:'Slot not available'})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')
        
        const cleanDocData = docData.toObject()
        delete cleanDocData.slots_booked
        // delete docData.slots_booked
        
        
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:'Appointment Booked'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const listAppointment = async (req,res) =>{
    try {
        const userId = req.user.id; // ✅ récupéré depuis le token
        // const {userId} = req.body
        const appointments = await appointmentModel.find({userId})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const cancelAppointment = async(req,res) => {
    try {
        const userId = req.user.id; // ✅ depuis le token
         const { appointmentId } = req.body;
        // const {userId,appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData.userId !== userId) {
            return res.json({success:false, message:'Unauthorized action'})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
        const {docId, slotDate, slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        res.json({success:true, message:'Appointment Cancelled'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


// const razorpayInstance = new razorpay({
//     key_id : process.env.RAZOYPAY_KEY_ID,
//     key_secret:process.env.RAZOYPAY_KEY_SECRET
// })
// const paymentRazoypay = async (req,res) => {
//     try {
//         const {appointmentId} = req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)
//         if (!appointmentData || appointmentData.cancelled) {
//             return res.json({success:false,message:"Appointment Cancelled or not found"})
//         }
//         const options = {
//             amount : appointmentData.amount * 100,
//             currency : process.env.CURRENCY,
//             receipt: appointmentId,
//         }
//         const order = await razorpayInstance.orders.create(options)
//         res.json({success:true, order})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
//     }
// }
// const verifyRarorpay = async(req,res) =>{
//     try {
//         const {razorpay_order_id} = req.body
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         if (orderInfo.status === 'paid') {
//             await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
//             res.json({success:true,message:"Payment Successful"})
//         }else{
//             res.json({success:false,message:"Payment Failed"})

//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
//     }
// }


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const paymentStripe = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment not found or cancelled" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY || "usd",
            product_data: { name: appointmentData.docData.name },
            unit_amount: appointmentData.amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success/${appointmentId}`,
      cancel_url: `${process.env.FRONTEND_URL}/my-appointments`,
    });

    res.json({ success: true, sessionUrl: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const confirmStripePayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
    res.json({ success: true, message: "Payment confirmed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// export {registerUser,loginUser,getProfile,updateProfile, bookAppointment,listAppointment, cancelAppointment, paymentRazoypay, verifyRarorpay}
export {registerUser,loginUser,getProfile,updateProfile, bookAppointment,listAppointment, cancelAppointment, paymentStripe,confirmStripePayment}