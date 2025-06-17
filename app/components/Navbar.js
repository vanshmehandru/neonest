"use client";

import React from "react";
// import { Baby } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/Button";
import Chatbot from "./Chatbot";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const tabs = [
  { label: "home", path: "/" },
  { label: "growth", path: "/Growth" },
  { label: "feeding", path: "/Feeding" },
   { label: "sleep", path: "/Sleep" },
  { label: "medical", path: "/Medical" },
  { label: "essentials", path: "/Essentials" },
  { label: "memories", path: "/Memories" },
  { label: "resources", path: "/Resources" },
  { label: "faqs", path: "/Faqs" },
  { label: "lullaby", path: "/Lullaby" }
];

const Navbar = () => {
  const pathname = usePathname();

  const { isAuth, logout } = useAuth();
  console.log(isAuth);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div >
              <Image
                src="/logo.jpg"
                alt="NeoNest"
                width={60}
                height={60} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              NeoNest
            </span>
          </div>

          {/* Tabs */}
          <nav className="hidden md:flex items-center gap-4">
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
            {!isAuth ? (
              <>
                {" "}
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
              </>
            ) : (
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                onClick = {logout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
