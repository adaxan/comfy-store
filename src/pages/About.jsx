import React from 'react';

function About() {
  return (
    <div className="container mx-auto flex flex-col items-center text-center py-16">
      <h1 className="text-6xl font-bold mb-10">
        We love <span className="bg-blue-600 text-white px-6 py-3 rounded-md">comfy</span>
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, eligendi doloremque. Impedit ipsa ea assumenda hic itaque? Pariatur illo rem quasi nihil ex esse commodi necessitatibus, vero amet animi repellendus?
      </p>
    </div>
  );
}

export default About;