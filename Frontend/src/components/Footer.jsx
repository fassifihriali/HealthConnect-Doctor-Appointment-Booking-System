import React from 'react'
import { assets } from '../assets/assets'
import logo from '../assets/logo.png'


const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/** LEFT **/ }
            <div className='lg:ml-10 lg:-mt-11'>
                <img src={logo} alt="" style={{height:'100px'}}/>
                <p className='w-full text-gray-600 leading-6'>Doctor Appointment Booking System is designed to make healthcare more accessible and organized. Patients can easily schedule, manage, and track their medical appointments, while doctors can efficiently manage their schedules. This platform ensures convenience, time-saving, and better communication between patients and healthcare providers.</p>
            </div>
            {/** CENTER **/ }
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>Abou Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            {/** RIGHT **/ }
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+212 612 34 56 78</li>
                    <li>healthconnect@gmail.com</li>
                </ul>
            </div>
        </div>
        {/** Copyright **/}
        <div>
            <hr />
            <p className='py-5 text-center'>Copyright 2025@ HealthConnect  All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer