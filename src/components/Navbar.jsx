import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <span className="font-bold text-xl tracking-wide flex items-center gap-1">
              ✨ Taskify
            </span>
          </div>

          

          <div className="flex items-center gap-6">
            <ul className="flex gap-6 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="cursor-pointer hover:text-indigo-300 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/todos"
                  className="cursor-pointer hover:text-indigo-300 transition"
                >
                  Your Tasks
                </Link>
              </li>
            </ul>

            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold cursor-pointer hover:bg-indigo-400 transition">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
