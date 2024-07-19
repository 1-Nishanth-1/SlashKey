import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import medical from "../assets/medical.jpg";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log("Input name:", e.target.name, "Input value:", e.target.value);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://192.168.126.77:8000/api/api/token/", {
      method: "POST",
      body: JSON.stringify({
        username: user.name,
        password: user.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(JSON.stringify(response));
          throw new Error("Failed to authenticate");
        }
        return response.json();
      })
      .then((response) => {
        localStorage.setItem("AccessToken", JSON.stringify(response.access));
        localStorage.setItem("RefreshToken", JSON.stringify(response.refresh));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <span className="mb-2 text-md">Name</span>
              <input
                value={user.name}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                id="name"
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                value={user.password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Sign in
            </button>
          </form>
          <div className="text-center text-gray-400">
            Don't have an account?
            <Link to="/register">
              <span className="font-bold text-black"> Sign up </span>
            </Link>
          </div>
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

export default Login;
