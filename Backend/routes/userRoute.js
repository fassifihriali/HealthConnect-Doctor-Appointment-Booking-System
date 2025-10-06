import express from 'express'
// import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazoypay, verifyRarorpay } from '../controllers/userController.js'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentStripe, confirmStripePayment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
// import Stripe from "stripe";
// import Appointment from "../models/appointmentModel.js";

const userRouter = express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
// userRouter.post('/payment-razorpay', authUser,paymentRazoypay)
// userRouter.post('/verifyRazorpay',authUser,verifyRarorpay)
userRouter.post('/payment-stripe', authUser, paymentStripe);
userRouter.post('/confirm-stripe-payment', authUser, confirmStripePayment);
// userRouter.post('/payment-stripe',authUser,paymentStripe)

export default userRouter