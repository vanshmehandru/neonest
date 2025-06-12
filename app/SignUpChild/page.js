'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SignupBabyPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const password = searchParams.get('password');

  const [babyAge, setBabyAge] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      babyAge,
      birthdate,
      gender,
    };
    console.log('Final Signup Data:', formData);
    alert('Signup completed! Data in console.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-600">Baby Details</h1>

        <input
          type="number"
          placeholder="Baby Age (months)"
          value={babyAge}
          onChange={(e) => setBabyAge(e.target.value)}
          required
          className="mb-4 w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
          className="mb-4 w-full px-4 py-2 border rounded-lg"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="mb-6 w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select Gender</option>
          <option value="Boy">Boy</option>
          <option value="Girl">Girl</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 rounded-lg font-semibold"
        >
          Complete Signup
        </button>
      </form>
    </div>
  );
}
