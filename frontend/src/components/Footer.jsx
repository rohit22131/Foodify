import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 border-t border-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              We are a leading food delivery service committed to bringing
              delicious meals to your doorstep. Fresh, fast, and reliable.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="text-sm space-y-2">
              <li>Phone: (123) 456-7890</li>
              <li>Email: support@foodify.com</li>
              <li>Address: 123 Food Street, Gourmet City</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-300 pt-5 text-center">
          <p className="text-xs">
            &copy; 2025 Food Delivery Service. All Rights Reserved.
          </p>
          <p className="text-xs mt-2">
            Follow us on:
            <a href="#" className="text-blue-500 hover:underline ml-2">
              Facebook
            </a>
            <a href="#" className="text-blue-500 hover:underline ml-2">
              Twitter
            </a>
            <a href="#" className="text-blue-500 hover:underline ml-2">
              Instagram
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
