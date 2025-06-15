import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API)

export async function POST(req) {
  try {
    const { messages, role } = await req.json()

    const chatMessages = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }))

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a helpful and friendly ${role} giving baby care advice.`,
            },
          ],
        },
        ...chatMessages,
      ],
    })

    const response = await result.response
    const reply = response.text()

    return Response.json({
      id: Date.now(),
      role: "assistant",
      content: reply,
      createdAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error("Gemini error:", err)
    return new Response(JSON.stringify({ error: "Gemini API error" }), {
      status: 500,
    })
  }
}
