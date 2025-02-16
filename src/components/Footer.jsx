import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">&copy; 2023 Agreement Genius. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;