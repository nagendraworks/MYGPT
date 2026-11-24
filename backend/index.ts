import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import cors from 'cors';
const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

app.use(cors());

const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Peter");
});

interface ChatMessage {
  sender: "user" | "ai";
  message: string;
}

interface messageStructure {
  messages: ChatMessage[];
}

app.post("/api/chat", async (req: Request<{}, {}, messageStructure>, res: Response) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Messages are required",
      });
    }
    const recentMessages = messages.slice(-10);
    const contents = recentMessages.map((msg) => ({
      role: msg.sender === "ai" ? "model" : "user",
      parts: [{ text: msg.message }]
    }));
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL!,
      contents: contents,
    });

    const reply = response.text;

    res.status(200).json({
      success:true,
      message: reply || "No response generated.",
    });
  } catch (error) {
    console.error("Gemini API error:", error);

        res.status(500).json({
          success: false,
          message: "Something went wrong while generating the response.",
        });
  }
});

app.listen(port, () => {
  console.log("Server is running at port 5000");
});
