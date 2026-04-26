import React from "react";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="mt-8 border-t border-gray-800 px-4 py-10 bg-gray-900 text-gray-300">
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
    </>
  );
};

export default Footer;
