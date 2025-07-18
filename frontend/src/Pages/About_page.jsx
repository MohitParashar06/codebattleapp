import React from "react";
import NavBar_M from "./NavBar_M";

const About_Page = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar_M />
      <div className="flex justify-center items-center py-10">
        <div className="bg-gray-800 rounded-xl shadow-lg max-w-2xl p-10">
          <h1 className="text-3xl font-bold text-[#EA00FF] mb-4">About Us</h1>
          <p className="mb-6 text-gray-200">
            <span className="font-bold text-[#EA00FF]">codeConstruct</span> is a platform for collaborative coding, learning, and problem-solving.
          </p>
          <ul className="list-disc ml-5 space-y-2 text-gray-300 mb-8">
            <li>Practice coding with a rich set of problems</li>
            <li>Create and join real-time rooms for contests or group work</li>
            <li>Seamlessly use our powerful code editor</li>
            <li>Be a part of a vibrant programming community</li>
          </ul>
          <p className="text-gray-400 italic">
            Our mission is to help every coder find their best self through collaboration and constant learning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About_Page;
