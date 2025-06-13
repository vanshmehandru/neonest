"use client";

import React from "react";
import { Baby } from "lucide-react";
import { Button } from "./ui/Button";
import Chatbot from "./Chatbot";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "home", path: "/" },
  { label: "feeding", path: "/Feeding" },
  { label: "medical", path: "/Medical" },
  { label: "memories", path: "/Memories" },
  { label: "resources", path: "/Resources" },
  { label: "essentials", path: "/Essentials" },
  { label: "faqs", path: "/Faqs" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              BabyCare
            </span>
          </div>

          {/* Tabs */}
          <nav className="hidden md:flex items-center gap-6">
            {tabs.map(({ label, path }) => (
              <Link
                key={label}
                href={path}
                className={`transition-colors capitalize ${
                  pathname === path
                    ? "text-pink-600"
                    : "text-gray-600 hover:text-pink-600"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center space-x-2">
            <Chatbot />
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <Link href="/Login">Login</Link>
            </Button>

            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <Link href="/Signup">Signup</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;