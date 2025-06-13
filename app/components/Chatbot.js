// "use client"

// import { MessageCircle } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"

// export default function Chatbot() {
//   const router = useRouter()
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.location.pathname === "/NeonestAi") {
//       setIsVisible(false)
//     }
//   }, [])

//   if (!isVisible) return null

//   return (
//     <button
//       onClick={() => router.push("/NeonestAi")}
//       className="fixed z-50 top-20 right-6 md:right-8 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 ease-in-out"
//       aria-label="Open NeoNest Chatbot"
//     >
//       <MessageCircle className="w-6 h-6" />
//     </button>
//   )
// }

"use client"

import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../components/ui/tooltip"

export default function Chatbot() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/NeonestAi") {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => router.push("/NeonestAi")}
            className="fixed z-50 top-20 right-6 md:right-8 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 ease-in-out"
            aria-label="Open NeoNest Chatbot"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">NeoNest AI Chatbot</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
