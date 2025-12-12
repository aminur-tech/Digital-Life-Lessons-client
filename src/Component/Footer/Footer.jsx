import React from "react";
import { Link } from "react-router";
import { Facebook, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">Digital Life Lessons</h2>
          <p className="mt-3 text-gray-400">
            Learn, grow, and improve your digital journey with modern tools and guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/public-lessons" className="hover:text-blue-400">public lessons</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-blue-400">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex items-center space-x-5">
            <a href="https://github.com/aminur-tech" className="hover:text-blue-400"><Github /></a>
            <a href="https://www.linkedin.com/in/aminur-rahman4078" className="hover:text-blue-400"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Digital Life Lessons — All Rights Reserved.
      </div>
    </footer>
  );
}
