import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Generate Agreement Card */}
          <div className="bg-gray-700 p-8 rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold mb-4">Generate Agreement </h3>
            <p className="mb-6">Create custom agreements tailored to your needs in just a few clicks.</p>
            <Link to='/generate'> <a href="#" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Try Now</a></Link>
          </div>
          {/* Summarize Agreement Card */}
          <div className="bg-gray-700 p-8 rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold mb-4">Summarize Agreement</h3>
            <p className="mb-6">Quickly summarize lengthy agreements and extract key points.</p>
            <Link to='/Summarize'><a href="#" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Try Now</a></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;