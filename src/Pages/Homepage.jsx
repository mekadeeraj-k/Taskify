import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const Home = () => {
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);
  const boxRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      subTextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 1, ease: "back.out(1.7)" }
    );

    gsap.fromTo(
      boxRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 1.2,
        ease: "power2.out",
      }
    );
  }, []);

  const features = [
    {
      title: "📌 Easy Task Management",
      desc: "Create, edit, and organize your tasks in seconds. Stay on top of your to-do list without any hassle.",
    },
    {
      title: "⏰ Stay on Track",
      desc: "Set reminders and deadlines to ensure you never miss what’s important. Boost your consistency every day.",
    },
    {
      title: "📊 Boost Productivity",
      desc: "Track progress, complete tasks efficiently, and achieve your goals with a clear and simple workflow.",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center min-h-[90vh] px-4 bg-white">
        {/* Hero */}
        <h1
          ref={headingRef}
          className="text-5xl font-extrabold text-indigo-600"
        >
          Welcome to{" "}
          <span className="text-[#1E293B]" style={{ color: "yellowgreen" }}>
            Taskify
          </span>
        </h1>

        <p ref={subTextRef} className="mt-4 text-lg md:text-xl max-w-2xl">
          Organize your goals efficiently 🚀
        </p>

        <Link
          ref={buttonRef}
          to="/todos"
          className="mt-8 px-8 py-3 text-lg font-semibold bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Get Started ➡️
        </Link>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {features.map((item, i) => (
            <div
              key={i}
              ref={(el) => (boxRefs.current[i] = el)}
              className="p-6 bg-white shadow-lg rounded-xl border hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-indigo-600">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
