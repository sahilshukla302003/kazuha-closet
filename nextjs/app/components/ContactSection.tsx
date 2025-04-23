'use client';

import React from 'react';

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen px-6 py-16 bg-[#0f0f10] text-white flex items-center justify-center"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">Get in Touch</h2>

          <div>
            <h4 className="text-xl font-semibold">Email</h4>
            <p className="text-lg text-gray-300">contact@yourdomain.com</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold">Location</h4>
            <p className="text-lg text-gray-300">Bangalore, India</p>
          </div>
        </div>

        {/* Right Form */}
        <form className="bg-white text-black p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              placeholder="Type your message..."
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
