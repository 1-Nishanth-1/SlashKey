import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import medical from "../assets/medical.jpg"
function Login() {
  const [user, setUser ] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    console.log("Input name:", e.target.name, "Input value:", e.target.value);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
    >
      <div class="flex flex-col justify-center p-8 md:p-14">
        <span class="mb-3 text-4xl font-bold">Welcome back</span>
        <span class="font-light text-gray-400 mb-8">
          Welcome back! Please enter your details
        </span>
        <div class="py-4">
          <span class="mb-2 text-md">Email</span>
          <input
            value={user.email}
            onChange={(e)=>handleChange(e)}
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="email"
            id="email"
          />
        </div>
        <div class="py-4">
          <span class="mb-2 text-md">Password</span>
          <input
            value={user.password}
            onChange={(e)=>handleChange(e)}
            type="password"
            name="password"
            id="password"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>
        <button
          class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
        onClick={()=>handleSubmit()}>
          Sign in
        </button>
        <div class="text-center text-gray-400">
          Dont'have an account?
          <Link to="/register"><span class="font-bold text-black">Sign up for free</span></Link>
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
    </>
  )
}

export default Login
