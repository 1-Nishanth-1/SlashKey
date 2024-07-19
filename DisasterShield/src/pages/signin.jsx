import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import medical from '../assets/medical.jpg'
function SignUp() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]=useState('');
  
  
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
    >
      <div class="flex flex-col justify-center p-8 md:p-14">
        <span class="mb-3 text-4xl font-bold">Register your account</span>
        <span class="font-light text-gray-400 mb-8">
          Enter your details
        </span>
        <div class="py-4">
          <span class="mb-2 text-md">Name</span>
          <input
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="name"
            id="name"
          />
        </div>
        <div class="py-4">
          <span class="mb-2 text-md">Email</span>
          <input
            type="email"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="email"
            id="email"
          />
        </div>
        <div class="py-4">
          <span class="mb-2 text-md">Password</span>
          <input
            type="password"
            name="pass"
            id="pass"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>
        <button
          class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
        >
          Sign Up
        </button>
        <div class="text-center text-gray-400">
          Already have an account?
          <Link to="/login"><span class="font-bold text-black">Login now!</span></Link>
        </div>
      </div>
    
      <div class="relative">
        <img
          src={medical}
          alt="img"
          class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
        />
      </div>
    </div>
  </div>
  )
}

export default SignUp
