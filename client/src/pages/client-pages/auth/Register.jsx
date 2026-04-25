import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Inputs from "../../../components/client-ui/Inputs";
import { Link } from "react-router";
const INITIAL_VALUE = {
    fullName:'',
    email : '',
    phone : '',
    password:''
}
export default function Register() {
    const [inputFields,setInputFields] = useState({...INITIAL_VALUE})
    // handleChange
    const handleChange = (e)=>{
        setInputFields((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    console.log(inputFields)
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
          Create Account
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <div className="flex items-center bg-gray-800 rounded-lg px-3">
            <FaUser className="text-gray-400" />
            <Inputs
                type={'text'}
                name={'fullName'}
                placeholder={'Full Name'}
                value={inputFields.fullName}
                onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-gray-800 rounded-lg px-3">
            <FaEnvelope className="text-gray-400" />
            <Inputs
                type={'email'}
                name={'email'}
                placeholder={'Email Address'}
                value={inputFields.email}
                onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="flex items-center bg-gray-800 rounded-lg px-3">
            <FaLock className="text-gray-400" />
            <Inputs
                type={'text'}
                name={'phone'}
                placeholder={'Phone Number'}
                value={inputFields.phone}
                onChange={handleChange}
            />
          </div>
          {/* Password */}
          <div className="flex items-center bg-gray-800 rounded-lg px-3">
            <FaLock className="text-gray-400" />
            <Inputs
                type={'password'}
                name={'password'}
                placeholder={'Password'}
                value={inputFields.password}
                onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center bg-gray-800 rounded-lg px-3">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-transparent px-3 py-2 outline-none text-sm"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-linear-to-r from-green-400 to-blue-500 py-2 rounded-lg text-black font-semibold"
          >
            Register
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account? 
          <Link to={'/login'} className="text-green-400 cursor-pointer"> Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
