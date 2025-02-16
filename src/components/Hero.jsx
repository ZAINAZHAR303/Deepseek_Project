import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay muted loop className="absolute w-full h-full object-cover">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center animate-fadeIn">
        <h1 className="text-6xl font-bold mb-4">Simplify Your Agreements</h1>
        <p className="text-xl mb-8">Generate, Summarize, and Analyze Agreements with Ease</p>
        <a href="#" className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300">Get Started</a>
      </div>
    </section>
  );
};

export default Hero;