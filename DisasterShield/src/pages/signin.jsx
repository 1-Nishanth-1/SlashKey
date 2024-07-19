import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import medical from "../assets/medical.jpg";

function SignUp() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "pass") {
      setPassword(value);
    } else if (name === "username") {
      setUserName(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log(data);

      setMessage("Registration successful!");
      setEmail("");
      setPassword("");
      setName("");
      navigate("/signin");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Register your account</span>
          <span className="font-light text-gray-400 mb-8">
            Enter your details
          </span>
          {message && <div className="mb-4 text-red-500">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <span className="mb-2 text-md">Name</span>
              <input
                onChange={handleChange}
                value={name}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                id="name"
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                onChange={handleChange}
                value={email}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                onChange={handleChange}
                value={password}
                type="password"
                name="pass"
                id="pass"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <button className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
              Sign Up
            </button>
            <div className="text-center text-gray-400">
              Already have an account?
              <Link to="/login">
                <span className="font-bold text-black"> Login now!</span>
              </Link>
            </div>
          </form>
        </div>

        <div className="relative">
          <img
            src={medical}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
