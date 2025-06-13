'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({ name, email, password }).toString();
    router.push(`/signupbaby?${query}`); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-yellow-100 to-pink-100">
      <form onSubmit={handleNext} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-pink-600">Parent Signup</h1>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-4 w-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
        />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 w-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
        />

        <p className="text-center text-sm text-gray-500 mb-4">
          At NeoNest, your data privacy is paramount. We are committed to keeping your information confidential and do not share it with third parties.
        </p>

        <button
          type="submit" onClick={handleNext}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Next
        </button>
      </form>
    </div>
  );
}
