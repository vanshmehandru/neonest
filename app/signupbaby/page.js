'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupBabyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const password = searchParams.get('password');

  const [numBabies, setNumBabies] = useState(1);
  const [conceivedDate, setConceivedDate] = useState('');
  const [deliveryType, setDeliveryType] = useState('');

  const [babies, setBabies] = useState([
    { name: '', gender: '', birthdate: '', timeOfBirth: '', weight: '' },
  ]);

  // ➕ Update babies list when number changes
  const handleNumBabiesChange = (e) => {
    const count = parseInt(e.target.value);
    setNumBabies(count);
    setBabies((prev) =>
      Array.from({ length: count }, (_, i) => prev[i] || {
        name: '',
        gender: '',
        birthdate: '',
        timeOfBirth: '',
        weight: ''
      })
    );
  };

  // 📝 Handle field update
  const handleBabyChange = (index, field, value) => {
    const updated = [...babies];
    updated[index][field] = value;
    setBabies(updated);
  };

  // ✅ Final submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
      deliveryType,
      babies,
    };

    console.log('Final Signup Data:', formData);

    // 🔁 Redirect to homepage
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold mb-1 text-center text-purple-600">Baby Details</h1>
        <h2 className="text-md text-center text-gray-500 mb-4">Welcome, {name} 👋</h2>

        {/* General Info */}
        <label className="text-sm text-gray-600 mb-1 block">Number of babies at birth</label>
        <select
          value={numBabies}
          onChange={handleNumBabiesChange}
          className="mb-4 w-full px-4 py-2 border border-purple-300 rounded-lg"
        >
          <option value={1}>1 (Single)</option>
          <option value={2}>2 (Twins)</option>
          <option value={3}>3 (Triplets)</option>
        </select>

    
        <label className="text-sm text-gray-600 mb-1 block">Type of Delivery</label>
        <select
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
          required
          className="mb-6 w-full px-4 py-2 border border-purple-300 rounded-lg"
        >
          <option value="">Select Delivery Type</option>
          <option value="Normal">Normal</option>
          <option value="C-Section">C-Section</option>
          <option value="Assisted">Assisted</option>
        </select>

        {/* Baby Sections */}
        {babies.map((baby, index) => (
          <div
            key={index}
            className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50"
          >
            <h3 className="font-semibold text-purple-700 mb-2">
              Baby {index + 1}
            </h3>

            <input
              type="text"
              placeholder="Baby's Name"
              value={baby.name}
              onChange={(e) => handleBabyChange(index, 'name', e.target.value)}
              required
              className="mb-3 w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="date"
              value={baby.birthdate}
              onChange={(e) => handleBabyChange(index, 'birthdate', e.target.value)}
              required
              className="mb-3 w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="time"
              value={baby.timeOfBirth}
              onChange={(e) => handleBabyChange(index, 'timeOfBirth', e.target.value)}
              required
              className="mb-3 w-full px-4 py-2 border rounded-lg"
              placeholder="Time of Birth"
            />

            <select
              value={baby.gender}
              onChange={(e) => handleBabyChange(index, 'gender', e.target.value)}
              required
              className="mb-3 w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="number"
              value={baby.weight}
              onChange={(e) => handleBabyChange(index, 'weight', e.target.value)}
              placeholder="Weight at birth (kg) - optional"
              min="0"
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        ))}

        <p className="text-center text-sm text-gray-500 mb-4">
          At NeoNest, your data privacy is paramount. We are committed to keeping your information confidential and do not share it with third parties.
        </p>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Complete Signup
        </button>
      </form>
    </div>
  );
}
