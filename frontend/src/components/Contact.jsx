import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaUtensils,
  FaStar,
} from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 sm:px-6 lg:px-16">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Contact Info */}
        <div className="bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400 p-8 sm:p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden">
          <div className="absolute opacity-20 text-white -top-10 -right-10 text-[10rem] sm:text-[12rem]">
            <FaUtensils />
          </div>

          <div className="flex items-center mb-8 sm:mb-10">
            <MdDeliveryDining className="text-white text-4xl sm:text-6xl mr-4 animate-bounce" />
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Contact Us
            </h2>
          </div>

          <p className="mb-8 sm:mb-10 text-base sm:text-lg">
            Got questions or feedback? We'd love to hear from you!
          </p>

          <div className="space-y-6 text-sm sm:text-lg">
            <div className="flex items-center">
              <FaPhone className="text-white mr-3 sm:mr-4 text-lg sm:text-2xl" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <FaWhatsapp className="text-white mr-3 sm:mr-4 text-lg sm:text-2xl" />
              <span>+91 98765 43210 (WhatsApp)</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-white mr-3 sm:mr-4 text-lg sm:text-2xl" />
              <span>support@fooddelivery.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-white mr-3 sm:mr-4 text-lg sm:text-2xl" />
              <span>123, Food Street, Delhi, India</span>
            </div>
            <div className="flex items-center">
              <FaClock className="text-white mr-3 sm:mr-4 text-lg sm:text-2xl" />
              <span>Mon - Sun : 9:00 AM to 11:00 PM</span>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 flex items-center space-x-1 sm:space-x-2 text-yellow-300">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-xl" />
            ))}
            <span className="ml-2 text-white text-sm sm:text-lg">
              Rated 5.0 by 10,000+ customers
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6 sm:space-y-8 bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-orange-100 w-full">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-orange-600 text-center mb-4">
            Send Us a Message
          </h3>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-orange-300 text-base"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-orange-300 text-base"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-orange-300 text-base"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl text-base transition duration-300 shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
