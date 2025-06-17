
"use client";

import { useState } from "react";
import LullabyModal from "../components/Lullabies"; 
import { Music } from "lucide-react"; 

export default function Lullaby() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Lullabies for your baby</h1>
      <p className="text-lg text-gray-600 mb-10 text-center">
        Click the floating music icon in the bottom right corner to open the lullaby player. Let your child drift into sleep peacefully!
      </p>

      <LullabyModal show={showModal} onClose={() => setShowModal(false)} />

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg text-white flex items-center justify-center
                   bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                   transition-all duration-300 transform hover:scale-105 z-40"
        aria-label="Open Lullaby Player"
        title="Open Lullaby Player"
      >
        <Music size={24} />
      </button>
    </div>
  );
}