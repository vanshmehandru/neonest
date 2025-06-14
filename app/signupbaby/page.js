"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function SignupBabyPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [noOfBabies, setnoOfBabies] = useState(1);
  const [deliveryType, setDeliveryType] = useState("");

  const [babies, setBabies] = useState([
    { babyName: "", gender: "", dateOfBirth: "", time: "", Weight: "" },
  ]);

  // ➕ Update babies list when number changes
  const handleNoOfBabiesChange = (e) => {
    const count = parseInt(e.target.value);
    setnoOfBabies(count);
    setBabies((prev) =>
      Array.from(
        { length: count },
        (_, i) =>
          prev[i] || {
            name: "",
            gender: "",
            birthdate: "",
            timeOfBirth: "",
            weight: "",
          }
      )
    );
  };

  const handleBabyChange = (index, field, value) => {
    const updated = [...babies];
    updated[index][field] = value;
    setBabies(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("noOfBabies", noOfBabies);
      formData.append("deliveryType", deliveryType);
      formData.append("BabyDet", JSON.stringify(babies));

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token} `,
          },
        }
      );
      const data = await res.data;
      if (data.error) {
        toast.error(data.error);
      }

      console.log(data);

      toast.success(data.success);
      router.push(`/`);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold mb-1 text-center text-purple-600">
          Baby Details
        </h1>
        <h2 className="text-md text-center text-gray-500 mb-4">
          Welcome, {name} 👋
        </h2>

        {/* General Info */}
        <label className="text-sm text-gray-600 mb-1 block">
          Number of babies at birth
        </label>
        <select
          value={noOfBabies}
          onChange={handleNoOfBabiesChange}
          className="mb-4 w-full px-4 py-2 border border-purple-300 rounded-lg"
        >
          <option value={1}>1 (Single)</option>
          <option value={2}>2 (Twins)</option>
          <option value={3}>3 (Triplets)</option>
        </select>

        <label className="text-sm text-gray-600 mb-1 block">
          Type of Delivery
        </label>
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
              value={baby.babyName}
              onChange={(e) =>
                handleBabyChange(index, "babyName", e.target.value)
              }
              required
              className="mb-3 w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="date"
              value={baby.dateOfBirth}
              onChange={(e) =>
                handleBabyChange(index, "dateOfBirth", e.target.value)
              }
              required
              className="mb-3 w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="time"
              value={baby.time}
              onChange={(e) => handleBabyChange(index, "time", e.target.value)}
              required
              className="mb-3 w-full px-4 py-2 border rounded-lg"
              placeholder="Time of Birth"
            />

            <select
              value={baby.gender}
              onChange={(e) =>
                handleBabyChange(index, "gender", e.target.value)
              }
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
              value={baby.Weight}
              onChange={(e) =>
                handleBabyChange(index, "Weight", e.target.value)
              }
              placeholder="Weight at birth (kg) - optional"
              min="0"
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        ))}

        <p className="text-center text-sm text-gray-500 mb-4">
          At NeoNest, your data privacy is paramount. We are committed to
          keeping your information confidential and do not share it with third
          parties.
        </p>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Complete Signup
        </button>
      </form>
    </div>
    </>
  );
}
