"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-5 px-5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                {/* <Baby className="w-4 h-4 text-white" /> */}
              </div>
              <span className="text-lg font-bold">NeoNest</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Supporting parents through their baby's incredible first year with expert guidance, AI assistance, and
              loving community.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Features</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <button onClick={() => setActiveTab("feeding")} className="hover:text-white transition-colors">
                  Feeding Schedule
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("vaccines")} className="hover:text-white transition-colors">
                  Vaccine Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("memories")} className="hover:text-white transition-colors">
                  Memory Vault
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("inventory")} className="hover:text-white transition-colors">
                  Inventory Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <button onClick={() => setActiveTab("faqs")} className="hover:text-white transition-colors">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("resources")} className="hover:text-white transition-colors">
                  Resources
                </button>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Contact</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@neonest.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1-800-NEONEST</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-xs text-gray-400">
          <p>&copy; 2025 NeoNest. All rights reserved. Made with ❤️ for parents and babies.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
