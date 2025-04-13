import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-slate-200 py-8 border-t border-gray-600 ">
      <div className="container mx-auto px-4 m-16">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <img src="/images/Salonify.png" alt="Salonify Logo" className="h-20 mb-4 mx-auto md:mx-0" />
            <p className="text-sm text-gray-600">
              Salonify is a simple, powerful, and affordable software built for managing Salons, Spas & Nail Studios.
            </p>
            <p className="text-sm text-gray-600 mt-2">Built with ❤️ at HP's Labs.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="text-lg text-blue-900 font-semibold mb-2">SALONIFY</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/get-started">Get Started</Link></li>
                <li><Link to="/features">Features</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg text-blue-900 font-semibold mb-2">COMPANY</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg text-blue-900 font-semibold mb-2">RESOURCES</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/support">Support Center</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg text-blue-900 font-semibold mb-2">ADDRESS</h3>
              <p className="text-sm text-gray-600">
                Aaj kamayenga , toh kal khayenga , ghar pe baithe kab tak rotiya todega ,
                 Haa meri jaan..
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 ml-20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.youtube.com/@laxmanpatil9842" className="text-gray-600 hover:text-gray-800">
              <FaYoutube size={24} />
            </a>
          </div>

          <div className="text-sm mr-20 text-gray-600">
            All Rights Reserved © 2015-2024 HP Technologies LLP | 
            <Link to="/privacy" className="underline">Privacy</Link> | 
            <Link to="/cookies" className="underline">Cookies</Link> | 
            <Link to="/terms" className="underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
