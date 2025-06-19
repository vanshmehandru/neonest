// "use client";

// import React from "react";
// // import { Baby } from "lucide-react";
// import Image from "next/image";
// import { Button } from "./ui/Button";
// import Chatbot from "./Chatbot";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../context/AuthContext";

// const tabs = [
//   { label: "home", path: "/" },
//   { label: "growth", path: "/Growth" },
//   { label: "feeding", path: "/Feeding" },
//    { label: "sleep", path: "/Sleep" },
//   { label: "medical", path: "/Medical" },
//   { label: "essentials", path: "/Essentials" },
//   { label: "memories", path: "/Memories" },
//   { label: "resources", path: "/Resources" },
//   { label: "faqs", path: "/Faqs" },
//   { label: "lullaby", path: "/Lullaby" }
// ];

// const Navbar = () => {
//   const pathname = usePathname();

//   const { isAuth, logout } = useAuth();
//   console.log(isAuth);

//   return (
//     <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div >
//               <Image
//                 src="/logo.jpg"
//                 alt="NeoNest"
//                 width={60}
//                 height={60} />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
//               NeoNest
//             </span>
//           </div>

//           {/* Tabs */}
//           <nav className="hidden md:flex items-center gap-4">
//             {tabs.map(({ label, path }) => (
//               <Link
//                 key={label}
//                 href={path}
//                 className={`transition-colors capitalize ${
//                   pathname === path
//                     ? "text-pink-600"
//                     : "text-gray-600 hover:text-pink-600"
//                 }`}
//               >
//                 {label}
//               </Link>
//             ))}
//           </nav>

//           {/* CTA */}

//           <div className="hidden md:flex items-center space-x-2">
//             <Chatbot />
//             {!isAuth ? (
//               <>
//                 {" "}
//                 <Button
//                   asChild
//                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                 >
//                   <Link href="/Login">Login</Link>
//                 </Button>
//                 <Button
//                   asChild
//                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                 >
//                   <Link href="/Signup">Signup</Link>
//                 </Button>
//               </>
//             ) : (
//               <Button
//                 className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                 onClick = {logout}>
//                 Logout
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "./ui/Button";
// import Chatbot from "./Chatbot";
// import { useAuth } from "../context/AuthContext"; // your existing context

// const tabs = [
//   { label: "home", path: "/" },
//   { label: "growth", path: "/Growth" },
//   { label: "feeding", path: "/Feeding" },
//   { label: "sleep", path: "/Sleep" },
//   { label: "medical", path: "/Medical" },
//   { label: "essentials", path: "/Essentials" },
//   { label: "memories", path: "/Memories" },
//   { label: "resources", path: "/Resources" },
//   { label: "faqs", path: "/Faqs" },
//   { label: "lullaby", path: "/Lullaby" },
// ];

// const Navbar = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { isAuth, logout } = useAuth();

//   const handleLogout = () => {
//     logout(); // clears token/localStorage or however you implemented it
//     localStorage.setItem("showLogoutToast", "true");
//     router.push("/"); // redirect to homepage
//   };

//   return (
//     <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Image src="/logo.jpg" alt="NeoNest" width={60} height={60} />
//             <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent ml-2">
//               NeoNest
//             </span>
//           </div>

//           {/* Navigation Tabs */}
//           <nav className="hidden md:flex items-center gap-4">
//             {tabs.map(({ label, path }) => (
//               <Link
//                 key={label}
//                 href={path}
//                 className={`transition-colors capitalize ${
//                   pathname === path
//                     ? "text-pink-600"
//                     : "text-gray-600 hover:text-pink-600"
//                 }`}
//               >
//                 {label}
//               </Link>
//             ))}
//           </nav>

//           {/* Call to Action Buttons */}
//           <div className="hidden md:flex items-center space-x-2">
//             <Chatbot />
//             {!isAuth ? (
//               <>
//                 <Button
//                   asChild
//                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                 >
//                   <Link href="/Login">Login</Link>
//                 </Button>
//                 <Button
//                   asChild
//                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                 >
//                   <Link href="/Signup">Signup</Link>
//                 </Button>
//               </>
//             ) : (
//               <Button
//                 onClick={handleLogout}
//                 className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//               >
//                 Logout
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;



// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "./ui/Button";
// import Chatbot from "./Chatbot";
// import { useAuth } from "../context/AuthContext";

// const tabs = [
//   { label: "home", path: "/" },
//   { label: "growth", path: "/Growth" },
//   { label: "feeding", path: "/Feeding" },
//   { label: "sleep", path: "/Sleep" },
//   { label: "medical", path: "/Medical" },
//   { label: "essentials", path: "/Essentials" },
//   { label: "memories", path: "/Memories" },
//   { label: "resources", path: "/Resources" },
//   { label: "faqs", path: "/Faqs" },
//   { label: "lullaby", path: "/Lullaby" },
// ];

// const Navbar = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { isAuth, logout } = useAuth();
//   const [showModal, setShowModal] = useState(false);
//   const [progress, setProgress] = useState(100);

//   const handleLogout = () => {
//     logout();
//     setShowModal(true);

//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev <= 0) {
//           clearInterval(interval);
//           setShowModal(false);
//           router.push("/"); // Now redirect
//           return 0;
//         }
//         return prev - 3.33; // 3 sec
//       });
//     }, 100);
//   };

//   return (
//     <>
//       {/* Logout Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999] flex items-center justify-center transition-all duration-300">
//           <div className="bg-white px-6 py-5 rounded-xl shadow-lg text-center w-[320px]">
//             <p className="text-gray-800 mb-3">
//               Logged out successfully.{" "}
//               <Link
//                 href="/Login"
//                 className="text-pink-600 font-normal no-underline"
//               >
//                 Login
//               </Link>{" "}
//               again!
//             </p>
//             <div className="w-full h-1 bg-pink-100 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-pink-500 transition-all duration-100"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       )}

//       <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center">
//               <Image src="/logo.jpg" alt="NeoNest" width={60} height={60} />
//               <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent ml-2">
//                 NeoNest
//               </span>
//             </div>

//             {/* Navigation Tabs */}
//             <nav className="hidden md:flex items-center gap-4">
//               {tabs.map(({ label, path }) => (
//                 <Link
//                   key={label}
//                   href={path}
//                   className={`transition-colors capitalize ${
//                     pathname === path
//                       ? "text-pink-600"
//                       : "text-gray-600 hover:text-pink-600"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Call to Action */}
//             <div className="hidden md:flex items-center space-x-2">
//               <Chatbot />
//               {!isAuth ? (
//                 <>
//                   <Button
//                     asChild
//                     className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                   >
//                     <Link href="/Login">Login</Link>
//                   </Button>
//                   <Button
//                     asChild
//                     className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                   >
//                     <Link href="/Signup">Signup</Link>
//                   </Button>
//                 </>
//               ) : (
//                 <Button
//                   onClick={handleLogout}
//                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                 >
//                   Logout
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Navbar;


// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "./ui/Button";
// import Chatbot from "./Chatbot";
// import { useAuth } from "../context/AuthContext";

// const tabs = [
//   { label: "home", path: "/" },
//   { label: "growth", path: "/Growth" },
//   { label: "feeding", path: "/Feeding" },
//   { label: "sleep", path: "/Sleep" },
//   { label: "medical", path: "/Medical" },
//   { label: "essentials", path: "/Essentials" },
//   { label: "memories", path: "/Memories" },
//   { label: "resources", path: "/Resources" },
//   { label: "faqs", path: "/Faqs" },
//   { label: "lullaby", path: "/Lullaby" },
// ];

// const Navbar = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { isAuth, logout } = useAuth();

//   const [showModal, setShowModal] = useState(false);
//   const [progress, setProgress] = useState(100);
//   const [startRedirect, setStartRedirect] = useState(false);

//   const handleLogout = () => {
//     logout(); // clear token/state
//     setShowModal(true);
//     setStartRedirect(true); // start the useEffect timer
//   };

//   // useEffect to handle progress + redirect
//   useEffect(() => {
//     if (!startRedirect) return;

//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev <= 0) {
//           clearInterval(interval);
//           setShowModal(false);
//           setStartRedirect(false);
//           router.push("/"); // safe to redirect now
//           return 0;
//         }
//         return prev - 3.33; // ~3s total
//       });
//     }, 100);

//     return () => clearInterval(interval);
//   }, [startRedirect]);

//   return (
//     <>
//       {/* Logout Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999] flex items-center justify-center transition-all duration-300">
//           <div className="bg-white px-6 py-5 rounded-xl shadow-lg text-center w-[320px]">
//             <p className="text-gray-800 mb-3">
//               Logged out successfully.{" "}
//               <Link href="/Login" className="text-pink-600 font-normal no-underline">
//                 Login
//               </Link>{" "}
//               again!
//             </p>
//             <div className="w-full h-1 bg-pink-100 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-pink-500 transition-all duration-100"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       )}

//       <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center">
//               <Image src="/logo.jpg" alt="NeoNest" width={60} height={60} />
//               <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent ml-2">
//                 NeoNest
//               </span>
//             </div>

//             {/* Navigation Tabs */}
//             <nav className="hidden md:flex items-center gap-4">
//               {tabs.map(({ label, path }) => (
//                 <Link
//                   key={label}
//                   href={path}
//                   className={`transition-colors capitalize ${
//                     pathname === path
//                       ? "text-pink-600"
//                       : "text-gray-600 hover:text-pink-600"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Call to Action */}
//             <div className="hidden md:flex items-center space-x-2">
//               <Chatbot />
//               {!isAuth ? (
//                 <>
//                   <Button
//                     asChild
//                     className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                   >
//                     <Link href="/Login">Login</Link>
//                   </Button>
//                   <Button
//                     asChild
//                     className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                   >
//                     <Link href="/Signup">Signup</Link>
//                   </Button>
//                 </>
//               ) : (
//                 <Button
//                   onClick={handleLogout}
//                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
//                 >
//                   Logout
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Navbar;


"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import Chatbot from "./Chatbot";
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
  { label: "lullaby", path: "/Lullaby" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuth, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleLogout = () => {
    logout();
    setShowModal(true);
    setProgress(100);
  };

  // Handle progress bar animation
  useEffect(() => {
    if (!showModal) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 3.33;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showModal]);

  // Redirect after modal completes
  useEffect(() => {
    if (progress <= 0 && showModal) {
      setShowModal(false);
      router.push("/");
    }
  }, [progress, showModal]);

  return (
    <>
      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999] flex items-center justify-center transition-all duration-300">
          <div className="bg-white px-6 py-5 rounded-xl shadow-lg text-center w-[320px]">
            <p className="text-gray-800 mb-3">
              Logged out successfully.{" "}
              <Link href="/Login" className="text-pink-600 font-normal no-underline">
                Login
              </Link>{" "}
              again!
            </p>
            <div className="w-full h-1 bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image src="/logo.jpg" alt="NeoNest" width={60} height={60} />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent ml-2">
                NeoNest
              </span>
            </div>

            {/* Navigation Tabs */}
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
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
