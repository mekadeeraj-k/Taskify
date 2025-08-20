import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-indigo-900 text-gray-300 py-10 mt-12 shadow-inner"
    >
      <div className="container mx-auto flex flex-col items-center text-center px-6">
        {/* App tagline */}
        <h2 className="text-lg font-semibold text-indigo-300 mb-2">
          Taskify - Goal Manager 🚀
        </h2>

        {/* Your Name */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Deeraj Kumar Meka
        </h1>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/mr_deeraj0030_/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-2 text-gray-300 hover:text-pink-500 transition text-sm"
        >
          <span className="text-lg">📸</span> @mr_deeraj0030_
        </a>

        {/* Copyright */}
        <p className="text-xs text-gray-400 mt-4">
          © {new Date().getFullYear()} Deeraj. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
