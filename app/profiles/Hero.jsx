import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional overlay */}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Site</h1>
        <p className="text-lg mb-8">Discover something amazing today</p>
        <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Get Started</button>
      </div>
    </div>
  );
}