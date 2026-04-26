import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* PREMIUM NAVBAR */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-3 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-r from-[#0f172a]/90 via-[#1e293b]/80 to-[#020617]/90 backdrop-blur-xl border-b border-white/10 shadow-xl"
            : "bg-gradient-to-r from-[#020617]/60 via-[#020617]/40 to-transparent"
        }`}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-black font-bold shadow-md">
            BV
          </div>
          <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Beautiful Valley
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {["Home", "Rooms", "Contact"].map((item, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -2, scale: 1.05 }}
              className="cursor-pointer hover:text-white transition"
            >
              {item}
            </motion.a>
          ))}

          <a
            href="/login"
            className="relative overflow-hidden bg-purple-600 px-4 py-2 rounded-xl text-white font-semibold shadow-lg hover:shadow-purple-500/40"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Login</span>
          </a>
        </div>

        {/* MOBILE BUTTON (IMPROVED) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 transition"
          onClick={() => setMenuOpen(true)}
        >
          <span className="w-5 h-0.5 bg-white mb-1"></span>
          <span className="w-5 h-0.5 bg-white mb-1"></span>
          <span className="w-5 h-0.5 bg-white"></span>
        </button>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] backdrop-blur-xl p-6 z-50 border-l border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white font-bold">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-6 text-lg text-gray-300">
                {["Home", "Rooms", "Contact"].map((item, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ x: 5 }}
                    className="cursor-pointer hover:text-white transition"
                  >
                    {item}
                  </motion.a>
                ))}

                <a
                  href="/login"
                  className="bg-purple-600 px-4 py-3 rounded-xl text-center text-white font-semibold shadow-lg"
                >
                  Login
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;