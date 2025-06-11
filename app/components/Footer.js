"use client"

import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                  {/* <Baby className="w-5 h-5 text-white" /> */}
                </div>
                <span className="text-xl font-bold">NeoNest</span>
              </div>
              <p className="text-gray-400 text-sm">
                Supporting parents through their baby's incredible first year with expert guidance, AI assistance, and
                loving community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
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
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
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
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@babycare.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>1-800-BABY-CARE</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 NeoNest. All rights reserved. Made with ❤️ for parents and babies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

