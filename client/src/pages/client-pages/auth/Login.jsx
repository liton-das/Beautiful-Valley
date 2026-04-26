import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Inputs from "../../../components/client-ui/Inputs";
import { Link, Navigate } from "react-router";
import { useLoginMutation } from "../../../services/api";
import Loading from "../../../components/Loading";
const INITIAL_VALUE = {
  email: "",
  password: "",
};
const Login = () => {
  const [inputFields, setInputFields] = useState({ ...INITIAL_VALUE });
  const [login, { isLoading }] = useLoginMutation();
  if(isLoading){
    return <Loading />;
  }
  // handleChange
  const handleChange = (e) => {
    setInputFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(inputFields).unwrap();
      <Navigate to={'/dashboard'}/>
      setInputFields({ ...INITIAL_VALUE });
      // Handle successful login, e.g., store token, redirect, etc.
    } catch (error) {
      console.error("Login failed:", error);
      setInputFields({ ...INITIAL_VALUE });
      // Handle login error, e.g., show error message to user
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 shadow-2xl"
      >
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex items-center bg-gray-800 rounded-lg px-3">
            <FaEnvelope className="text-gray-400" />
            <Inputs
              type={"email"}
              name={"email"}
              placeholder={"Email Address"}
              value={inputFields.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-800 rounded-lg px-3">
            <FaLock className="text-gray-400" />
            <Inputs
              type={"password"}
              name={"password"}
              placeholder={"Password"}
              value={inputFields.password}
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-linear-to-r from-green-400 to-blue-500 py-2 rounded-lg text-black font-semibold"
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Forgot Password?
          <Link to={'/reset-password'} className="text-green-400 cursor-pointer"> Reset Password</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
