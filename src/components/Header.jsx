import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed w-full bg-gray-900 bg-opacity-50 z-50  backdrop-blur-lg">
      <nav className="container mx-auto flex justify-between items-center p-4 rounded-lg bg-gray-800 bg-opacity-60 shadow-[inset_4px_4px_10px_rgba(255,255,255,0.1),inset_-4px_-4px_10px_rgba(0,0,0,0.5)]">
        <div className="text-2xl font-bold text-cyan-400 drop-shadow-lg">Deep Consent</div>
        <ul className="flex space-x-8">
          <li>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out shadow-sm">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out shadow-sm">
              <Link to="/generate">
              Generate Content
              </Link>
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out shadow-sm">
              <Link to="/Summarize">
              Summarize Content
              </Link>
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out shadow-sm">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
