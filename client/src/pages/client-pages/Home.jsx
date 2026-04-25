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
    </div>
  );
};

export default Home;
