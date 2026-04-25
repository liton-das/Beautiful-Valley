import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Navbar = () => {
      const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-r from-green-400 to-blue-500 flex items-center justify-center text-black font-bold">
            BV
          </div>
          <h1 className="text-lg font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Beautiful Valley
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <span className="cursor-pointer hover:text-gray-300">Home</span>
          <span className="cursor-pointer hover:text-gray-300">Rooms</span>
          <span className="cursor-pointer hover:text-gray-300">Contact</span>
          <button className="bg-purple-600 px-3 py-1 rounded-lg text-sm">Login</button>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden flex flex-col gap-1" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </header>
      {/* Mobile Menu */}
      {/* Mobile Menu (no design change, only enhancement) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-2/3 h-full bg-gray-900/95 backdrop-blur-lg p-6 z-50 md:hidden shadow-2xl"
          >
            <button onClick={() => setMenuOpen(false)} className="mb-6 text-right w-full">
              ✕
            </button>
            <div className="flex flex-col gap-4">
              <span>Home</span>
              <span>Rooms</span>
              <span>Contact</span>
              <button className="bg-purple-600 px-3 py-2 rounded-lg">Login</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
