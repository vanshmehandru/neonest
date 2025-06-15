"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import {
  Bot,
  Send,
  Loader2,
  Baby,
  Utensils,
  Clock,
  Heart,
  MessageSquare,
  TrendingUp,
  ThumbsUp,
  Users,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../components/ui/tooltip"
import { Button } from "../components/ui/Button"
import Input from "../components/ui/Input"
import Badge from "../components/ui/Badge"
import ReactMarkdown from "react-markdown"

const quickQuestions = [
  { icon: Baby, text: "When should my baby start crawling?", color: "pink" },
  { icon: Utensils, text: "How do I introduce solid foods?", color: "purple" },
  { icon: Clock, text: "What's a good sleep schedule for 6 months?", color: "blue" },
  { icon: Heart, text: "Is my baby's crying normal?", color: "green" },
]

const roles = [
  { label: "🧺 Pediatrician", value: "pediatrician" },
  { label: "👶 Baby", value: "baby" },
  { label: "🧃 Nani", value: "nani" },
]

export default function NeonestAi() {
  const [role, setRole] = useState("pediatrician")
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [analytics, setAnalytics] = useState({})
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e = null, customInput = null) => {
    if (e) e.preventDefault()
    const finalInput = customInput !== null ? customInput : input
    if (!finalInput.trim()) return

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: finalInput,
      createdAt: new Date().toISOString(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await axios.post("/api/chat", {
        messages: updatedMessages,
        role,
      })

      setMessages([...updatedMessages, res.data])
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question) => {
    setInput("")
    handleSubmit(null, question)
  }

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  useEffect(() => scrollToBottom(), [messages])

  useEffect(() => {
    setAnalytics({
      totalChats: 1247,
      totalMessages: 5832,
      averageResponseTime: 1.2,
      satisfactionRate: 94.5,
      topQuestions: [
        { question: "When should my baby start crawling?", count: 156 },
        { question: "How do I introduce solid foods?", count: 134 },
        { question: "What's a good sleep schedule?", count: 98 },
        { question: "Is my baby's crying normal?", count: 87 },
        { question: "When do babies start teething?", count: 76 },
      ],
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex justify-between items-center bg-pink-100 rounded-t-lg px-6 py-4">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-pink-500" />
            <CardTitle>NeoNest AI Chatbot</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border px-3 py-1 rounded-md text-sm bg-white cursor-pointer text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={6}>
                Choose the role you'd like to chat with
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {messages.length === 0 && (
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-500 mt-2">
                AI advice is not a substitute for professional medical consultation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickQuestions.map((q, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleQuickQuestion(q.text)}
                    variant="outline"
                    className="text-left justify-start text-sm"
                  >
                    <q.icon className={`w-4 h-4 mr-2 text-${q.color}-500`} />
                    {q.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex mt-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-xl px-4 py-2 max-w-xs ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div className="prose prose-sm max-w-full text-sm">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                  <span className="text-xs text-gray-300 block mt-1">
                    {formatTime(new Date(m.createdAt || Date.now()))}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about baby care..."
              className="flex-1 border-pink-300"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Chat Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <MessageSquare className="mx-auto text-pink-500" />
              <p className="font-bold">{analytics.totalChats}</p>
              <p className="text-xs text-gray-500">Total Conversations</p>
            </div>
            <div>
              <Users className="mx-auto text-purple-500" />
              <p className="font-bold">{analytics.totalMessages}</p>
              <p className="text-xs text-gray-500">Messages Sent</p>
            </div>
            <div>
              <Clock className="mx-auto text-blue-500" />
              <p className="font-bold">{analytics.averageResponseTime}s</p>
              <p className="text-xs text-gray-500">Avg. Response Time</p>
            </div>
            <div>
              <ThumbsUp className="mx-auto text-green-500" />
              <p className="font-bold">{analytics.satisfactionRate}%</p>
              <p className="text-xs text-gray-500">Satisfaction</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analytics.topQuestions?.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(q.question)}
                className="flex justify-between text-sm border-b pb-1 w-full text-left hover:bg-gray-100 px-2 py-1 rounded transition"
              >
                <span>{q.question}</span>
                <Badge variant="secondary">{q.count}</Badge>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
