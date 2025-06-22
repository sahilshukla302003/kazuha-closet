'use client';

import React from 'react';
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const ContactSection = () => {
  return (
    <section
      id="contact"
      className={`${poppins.className} relative min-h-screen px-3 sm:px-6 pt-8 sm:pt-36 pb-8 sm:pb-16 flex items-center justify-center overflow-hidden mt-16 md:mt-0`}
    >
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 bg-[url('/itachi.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-60 sm:opacity-50"></div>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
        {/* Left Info */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-3 sm:space-y-6 text-white order-2 lg:order-1"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-center lg:text-left">
            Get in Touch
          </h2>

          <div className="space-y-1 sm:space-y-2 text-center lg:text-left">
            <h4 className="text-lg sm:text-2xl font-semibold">Email</h4>
            <p className="text-sm sm:text-lg text-gray-300 break-all sm:break-normal">
              contact@yourdomain.com
            </p>
          </div>

          <div className="space-y-1 sm:space-y-2 text-center lg:text-left">
            <h4 className="text-lg sm:text-2xl font-semibold">Location</h4>
            <p className="text-sm sm:text-lg text-gray-300">Bangalore, India</p>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.form
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md text-white p-4 sm:p-8 lg:p-10 rounded-xl sm:rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-[1.01] sm:hover:scale-105 hover:shadow-3xl space-y-3 sm:space-y-6 border border-white/20 order-1 lg:order-2"
          action="https://formsubmit.co/kazuhastore8@gmail.com"
          method="POST"
        >
          {/* Hidden inputs for formsubmit */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="box" />
          <input
            type="hidden"
            name="_autoresponse"
            value="Thanks for reaching out! We'll get back to you soon."
          />

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full p-2.5 sm:p-4 bg-white/20 placeholder-white/70 text-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full p-2.5 sm:p-4 bg-white/20 placeholder-white/70 text-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Message</label>
            <textarea
              name="message"
              required
              placeholder="Type your message..."
              rows={3}
              className="w-full p-2.5 sm:p-4 bg-white/20 placeholder-white/70 text-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition resize-none text-sm sm:text-base"
            ></textarea>
          </div>

          <button
            type="submit"
            className="block w-full bg-black text-white py-2.5 sm:py-4 rounded-lg text-sm sm:text-lg font-semibold text-center hover:bg-gray-800 transition-colors duration-200 active:scale-95"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;