"use client";
import react from "react";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = react.useState(false);

  return (
    <nav className="navbar flex items-center justify-between p-4 bg-purple-600 text-white h-16">
      <div className="left">
        <h1>{`It's Rohan`}</h1>
      </div>

      <ul
        className={`${isMobileNavOpen ? "right-0" : "-right-full"} md:hidden h-[calc(100vh-4rem)] mobile-nav absolute top-16 backdrop:filter backdrop-blur-sm bg-transparent w-full transition-all duration-300  bg-gray-900 text-white flex flex-col items-center justify-center space-y-8 text-2xl`}
      >
        <li className="hover:text-gray-400 text-black backdrop:filter  hover:backdrop-blur-lg hover:bg-blue-100 w-full text-center ">
          <a href="#home">Home</a>
        </li>
        <li className="hover:text-gray-400 text-black backdrop:filter  hover">
          <a href="#about">About</a>
        </li>
        <li className="hover:text-gray-400 text-black backdrop:filter  hover">
          <a href="#projects">Projects</a>
        </li>
        <li className="hover:text-gray-400  text-blackbackdrop:filter  hover">
          <a href="#contact">Contact</a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Experience
          </a>
        </li>
      </ul>

      <ul className="hidden md:flex space-x-8">
        <li>
          <a href="#home" className="hover:text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-gray-400">
            About
          </a>
        </li>
        <li>
          <a href="#projects" className="hover:text-gray-400">
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-gray-400">
            Contact
          </a>
        </li>
      </ul>

      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
