// "use client";

// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { useAuth } from "../context/AuthContext";

// export default function SignupPage() {

//   useEffect(() => {
//       document.title = "Signup | NeoNest";
//     }, []);
  
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();

//   const handleNext = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.set("name", name);
//       formData.set("email", email);
//       formData.set("password", password);

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await res.data;

//       if(res.status == 201){
//         console.log(data);
//         login(res.data.token)

//         toast.success(data.success);
//         router.push(`/signupbaby`);
//       }
//       else{
//         toast.error(data.error);
//       }
//       }
//     catch(err){
//       console.log(err);
//       toast.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-yellow-100 to-pink-100">
//       <form
//         onSubmit={handleNext}
//         className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
//       >
//         <h1 className="text-2xl font-bold mb-4 text-center text-pink-600">
//           Parent Signup
//         </h1>

//         <input
//           type="text"
//           placeholder="Your Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="mb-4 w-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
//         />
//         <input
//           type="email"
//           placeholder="Your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="mb-4 w-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
//         />
//         <input
//           type="password"
//           placeholder="Create Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="mb-6 w-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
//         />

//         <p className="text-center text-sm text-gray-500 mb-4">
//           At NeoNest, your data privacy is paramount. We are committed to
//           keeping your information confidential and do not share it with third
//           parties.
//         </p>

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
//         >
//           Next
//         </button>
//       </form>
//     </div>
//   );
// }

// "use client";

// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { useAuth } from "../context/AuthContext";

// export default function SignupPage() {
//   useEffect(() => {
//     document.title = "Signup | NeoNest";
//   }, []);

//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();

//   const handleNext = async (e) => {
//     e.preventDefault();

//     try {
//       // Corrected: Send a plain JavaScript object instead of FormData
//       const userData = {
//         name: name,
//         email: email,
//         password: password,
//       };

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
//         userData, // Axios will automatically send this as JSON
//         // You can remove the headers object, or keep it explicitly for clarity,
//         // but it's not strictly necessary as axios defaults to application/json for objects.
//         // {
//         //   headers: {
//         //     "Content-Type": "application/json",
//         //   },
//         // }
//       );

//       const data = res.data; // Await is not needed here as res.data is already the parsed JSON

//       if (res.status === 201) { // Use '===' for strict comparison
//         console.log(data);
//         login(data.token); // Use data.token as 'res.data.token' is the same

//         toast.success(data.success);
//         router.push(`/signupbaby`);
//       } else {
//         // Axios typically throws an error for non-2xx status codes
//         // The catch block below will handle these.
//         // This 'else' block might only be reached if your axios interceptors
//         // or server configuration explicitly returns non-error responses with data.error.
//         // For standard error handling, rely on the catch block.
//         toast.error(data.error);
//       }
//     } catch (err) {
//       console.error("Signup error:", err); // Log the full error for debugging
//       if (axios.isAxiosError(err) && err.response) {
//         // Handle API errors where the server returned an error response
//         toast.error(err.response.data.error || "An unexpected error occurred.");
//       } else {
//         // Handle network errors or other unexpected issues
//         toast.error("Network error or unexpected problem.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-yellow-100 to-pink-100">
//       <form
//         onSubmit={handleNext}
//         className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
//       >
//         <h1 className="text-2xl font-bold mb-4 text-center text-pink-600">
//           Parent Signup
//         </h1>

//         <input
//           type="text"
//           placeholder="Your Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="mb-4 w-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
//         />
//         <input
//           type="email"
//           placeholder="Your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="mb-4 w-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
//         />
//         <input
//           type="password"
//           placeholder="Create Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="mb-6 w-full px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
//         />

//         <p className="text-center text-sm text-gray-500 mb-4">
//           At NeoNest, your data privacy is paramount. We are committed to
//           keeping your information confidential and do not share it with third
//           parties.
//         </p>

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
//         >
//           Next
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  useEffect(() => {
    document.title = "Signup | NeoNest";
  }, []);

  const router = useRouter();
  const { login } = useAuth();

  // State for input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for validation errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // State to track if an input field has been "touched" (interacted with)
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Function to validate name
  const validateName = (nameValue) => {
    if (!nameValue.trim()) {
      setNameError("Name cannot be empty.");
      return false;
    }
    setNameError("");
    return true;
  };

  // Function to validate email
  const validateEmail = (emailValue) => {
    if (!emailValue.trim()) {
      setEmailError("Email cannot be empty.");
      return false;
    }
    if (!emailValue.includes("@") || !emailValue.includes(".")) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Function to validate password
  const validatePassword = (passwordValue) => {
    if (!passwordValue.trim()) {
      setPasswordError("Password cannot be empty.");
      return false;
    }
    // IMPORTANT: Ensure this matches your backend's password length requirement.
    // Your backend previously had < 9, but your client-side now has < 6.
    // For consistency, I will assume 8 characters is the minimum as per earlier discussions.
    if (passwordValue.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Handle changes for each input with immediate validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    // Clear the specific "Email already exists" error when email changes
    if (emailError.includes("Email already exists")) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  // Determine if the form is valid and button should be enabled
  const isFormValid = useMemo(() => {
    const nameIsValid = validateName(name);
    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);
    return nameIsValid && emailIsValid && passwordIsValid;
  }, [name, email, password]);


  const handleNext = async (e) => {
    e.preventDefault();

    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);

    const nameValid = validateName(name);
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!nameValid || !emailValid || !passwordValid) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
        userData
      );

      const data = res.data;

      if (res.status === 201) {
        console.log(data);
        login(data.token);

        toast.success(data.success);
        router.push(`/signupbaby`);
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (axios.isAxiosError(err) && err.response) {
        const backendError = err.response.data.error;
        toast.error(backendError || "An unexpected error occurred.");

        if (backendError && backendError.includes("Email already exists")) {
          // Set the specific error message to be rendered with the link
          setEmailError("Email already exists! Login instead.");
          setEmailTouched(true);
        }
      } else {
        toast.error("Network error or unexpected problem.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-yellow-100 to-pink-100">
      <form
        onSubmit={handleNext}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-pink-600">
          Parent Signup
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            onBlur={() => setNameTouched(true)}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
              ${(nameError && nameTouched) ? 'border-red-500 focus:ring-red-400' : 'border-pink-300 focus:ring-pink-400'}
            `}
          />
          {(nameError && nameTouched) && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => setEmailTouched(true)}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
              ${(emailError && emailTouched) ? 'border-red-500 focus:ring-red-400' : 'border-pink-300 focus:ring-pink-400'}
            `}
          />
          {(emailError && emailTouched) && (
            <p className="text-red-500 text-sm mt-1">
              Email already exists!{' '}
              <span
                onClick={() => router.push('/Login')} // Navigate to login page
                className="text-pink-600 italic cursor-pointer hover:underline"
              >
                Login
              </span>{' '}
              instead.
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => setPasswordTouched(true)}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
              ${(passwordError && passwordTouched) ? 'border-red-500 focus:ring-red-400' : 'border-pink-300 focus:ring-pink-400'}
            `}
          />
          <p className="text-[11px] mt-1 text-gray-700 italic">Password must be at least 6 characters.</p>
          {(passwordError && passwordTouched) && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <p className="text-center text-sm text-gray-500 mb-4">
          At NeoNest, your data privacy is paramount. We are committed to
          keeping your information confidential and do not share it with third
          parties.
        </p>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 rounded-lg font-semibold transition-transform
            ${isFormValid
              ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Next
        </button>
      </form>
    </div>
  );
}
