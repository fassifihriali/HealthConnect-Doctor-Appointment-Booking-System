import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-12'>
          <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-3/4 text-sm text-gray-600 text-justify'>
            <p className='indent-5'>Welcome to HealthConnect, your trusted partner in healthcare management. Our mission is to make your health journey simpler, more convenient, and more efficient. We understand that finding the right doctor, scheduling appointments, and organizing medical records can sometimes feel overwhelming. That’s why HealthConnect provides an all-in-one platform that puts everything you need for your care right at your fingertips.</p>
            <p className='indent-5'>At HealthConnect, we believe that healthcare should evolve with technology. Our team is constantly improving the platform to integrate the latest innovations, making sure every user enjoys a smooth and reliable experience. From booking your very first consultation to managing ongoing treatments, HealthConnect ensures that you are always supported, informed, and connected with the right healthcare professionals.</p>
            <b className='text-gray-800'>Our Vision</b>
            <p className='indent-5'>Our vision is to create a future where healthcare is not only accessible but also personalized and seamless. We want to bridge the gap between patients and providers by offering a platform that removes unnecessary barriers and gives you control over your healthcare decisions. HealthConnect is here to make sure that whenever you need care—whether it’s a routine check-up or ongoing support—you can access it quickly, easily, and with complete confidence.</p>
            <p className='indent-5'>Through dedication, innovation, and a commitment to excellence, HealthConnect aims to transform the way people experience healthcare. We envision a world where managing your health is no longer stressful, but empowering. With HealthConnect, your well-being is always our priority.</p>
          </div>
        </div>
        <div className='text-xl my-4'>
          <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
        </div>
        <div className='flex flex-col md:flex-row mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300  text-gray-600 cursor-pointer'>
            <b>EFFINCIENCY:</b>
            <p> Streamlined Appointment Scheduling That First Into Your Busy Lifestyle.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300  text-gray-600 cursor-pointer'>
            <b>CONVENIENCE:</b>
            <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300  text-gray-600 cursor-pointer'>
            <b>PERSONALIZATION:</b>
            <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
          </div>
        </div>
    </div>
  )
}

export default About