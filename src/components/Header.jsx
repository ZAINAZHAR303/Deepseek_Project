import React from 'react';

const Header = () => {
  return (
    <header className="fixed w-full bg-gray-800 bg-opacity-90 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-blue-400">Agreement Genius</div>
        <ul className="flex space-x-8">
          <li><a href="#" className="hover:text-blue-400 transition duration-300">Home</a></li>
          <li><a href="#" className="hover:text-blue-400 transition duration-300">Generate Content</a></li>
          <li><a href="#" className="hover:text-blue-400 transition duration-300">Summarize Content</a></li>
          <li><a href="#" className="hover:text-blue-400 transition duration-300">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;