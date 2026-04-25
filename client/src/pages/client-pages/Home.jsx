import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rooms = [
  {
    id: 1,
    title: "Luxury Apartment",
    price: 120,
    discount: 90,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Modern Studio",
    price: 80,
    discount: 65,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    video: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Modern Studio",
    price: 80,
    discount: 65,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    video: "https://www.w3schools.com/html/movie.mp4",
  },
];
const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-gray-950 text-white flex flex-col min-h-screen">
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

      {/* Hero Section */}
      <section className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="hero"
          className="w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-gray-950" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-6xl font-extrabold mb-4 leading-tight">
            Find Your Perfect Stay in the Valley
          </h2>

          <p className="text-gray-300 max-w-2xl text-sm md:text-lg">
            Luxury, comfort, and affordability — explore premium rooms with immersive videos,
            stunning images, and exclusive discounts.
          </p>

          <div className="mt-6 w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-3 flex flex-col md:flex-row gap-3 shadow-xl">
            <input
              type="text"
              placeholder="Search location"
              className="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
            />
            <input type="date" className="bg-transparent outline-none px-3 py-2 text-sm" />
            <button className="bg-linear-to-r from-green-400 to-blue-500 px-5 py-2 rounded-xl text-black font-semibold text-sm">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <main className="flex-1 px-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.04 }}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
            >
              <img src={room.image} alt={room.title} className="w-full h-44 object-cover" />

              <div className="p-4">
                <h2 className="text-lg font-semibold">{room.title}</h2>

                <div className="flex items-center gap-2 mt-1">
                  <span className="line-through text-gray-500 text-sm">${room.price}</span>
                  <span className="text-green-400 font-bold">${room.discount}</span>
                </div>

                <video controls className="mt-3 rounded-lg w-full h-36 object-cover">
                  <source src={room.video} type="video/mp4" />
                </video>

                <button className="mt-3 w-full bg-linear-to-r from-purple-500 to-pink-500 py-2 rounded-xl text-sm">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-gray-800 px-4 py-10 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold text-white mb-3">Beautiful Valley</h2>
            <p className="text-gray-400">
              Discover premium rooms with comfort, luxury, and affordable prices. Your perfect stay
              starts here.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Rooms</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">About</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-3">Subscribe</h3>
            <p className="text-gray-400 mb-3">Get latest offers and updates</p>
            <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 bg-transparent px-3 py-2 outline-none text-sm"
              />
              <button className="bg-linear-to-r from-green-400 to-blue-500 px-4 py-2 text-black text-sm font-semibold">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
          © 2026 Beautiful Valley. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
