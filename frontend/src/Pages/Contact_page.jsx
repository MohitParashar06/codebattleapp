import React from "react";
import NavBar_M from "./NavBar_M";

const Contact_Page = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar_M />
      <div className="flex justify-center items-center py-10">
        <div className="bg-gray-800 rounded-xl shadow-lg p-10 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-[#EA00FF] mb-4">Contact Us</h1>
          <p className="mb-6 text-gray-200">
            We'd love to hear from you! Reach out to us using the form below or via email.
          </p>
          <form className="flex flex-col gap-5">
            <input
              className="rounded-md p-3 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:border-[#EA00FF] border"
              type="text"
              placeholder="Your Name"
              required
            />
            <input
              className="rounded-md p-3 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:border-[#EA00FF] border"
              type="email"
              placeholder="Your Email"
              required
            />
            <textarea
              className="rounded-md p-3 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:border-[#EA00FF] border"
              placeholder="Your Message"
              required
              rows={4}
            />
            <button
              type="submit"
              className="bg-[#EA00FF] hover:bg-pink-500 text-black font-semibold py-2 px-4 rounded-lg transition mt-2"
              disabled
              title="Contact form not connected"
            >
              Send Message
            </button>
          </form>
          <p className="mt-8 text-gray-400 text-sm text-center">
            Or email us at <a href="mailto:team@codeconstruct.com" className="text-[#EA00FF] underline">mohitparashar0603@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact_Page;
