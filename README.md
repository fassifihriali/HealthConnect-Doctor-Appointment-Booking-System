# 🩺 HEALTHCONNECT

# 🏥 Doctor Appointment Booking System

The **Doctor Appointment Booking System** is a full-stack web application that allows patients to easily book appointments with doctors and enables doctors to manage their schedules and patient information efficiently.  
The project was built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**, and integrates **Stripe** and **PayPal** for secure online payments.

---

## 🚀 Features

### 👩‍⚕️ For Patients
- Browse and search available doctors by specialization.  
- View doctor profiles with details such as name, experience, and consultation fees.  
- Book and pay for appointments online using **Stripe** or **PayPal**.  
- View appointment history and payment status.  
- Manage profile and personal information.

### 👨‍⚕️ For Doctors
- Secure login and authentication via JWT.  
- Manage availability (toggle on/off).  
- View, complete, or cancel appointments.  
- Access a **dashboard** with:
  - Total earnings  
  - Number of appointments  
  - Number of patients  
  - Latest appointment activity

### 💳 Payments
- Secure integration with **Stripe** and **PayPal** APIs for online payments.  
- Payment status automatically updated in the database after successful transactions.  
- Proper error handling and validation for failed or pending payments.

### 🛡️ Authentication & Security
- JWT-based authentication for both doctors and patients.  
- Passwords hashed with **bcrypt**.  
- Environment variables used to protect all API keys and sensitive data.  
- `.env` files excluded from Git tracking.

---

## 🧱 Tech Stack

| Category | Technologies |
|-----------|---------------|
| Frontend | React.js, Axios, Context API, React Router, Toastify |
| Backend | Node.js, Express.js, Mongoose |
| Database | MongoDB (Atlas) |
| Authentication | JSON Web Token (JWT), bcrypt |
| Payments | Stripe API, PayPal API |
| Environment | Vite (frontend), dotenv (backend) |
| UI/UX | Responsive and minimal modern design |

---



