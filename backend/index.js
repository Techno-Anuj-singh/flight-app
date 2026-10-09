
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "SkyScanner backend is running!",
  });
});

// Flight search test route
app.get("/api/flights", (req, res) => {
  const { from, to, departureDate } = req.query;

  console.log("New flight search received:");
  console.log("From:", from);
  console.log("To:", to);
  console.log("Departure Date:", departureDate);

  res.json({
    message: "Flight API is working!",
    search: {
      from,
      to,
      departureDate,
    },
    flights: [],
  });
});

// AI chatbot route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: "Please enter a message.",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: "Message must be 2000 characters or fewer.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `You are SkyScanner's travel assistant.
Help users with travel planning, baggage questions,
flight-search guidance, and general booking questions.
Be friendly and concise. Do not claim to book tickets
or provide live flight prices.

User question: ${message.trim()}`,
    });

    res.json({
      reply:
        response.text ||
        "Sorry, I couldn't generate a response.",
    });
  } catch (error) {
  console.error("Chatbot error:", error.message);
  console.error("Error status:", error.status);
  console.error("Error details:", error.errorDetails);

  res.status(500).json({
    error: "The chatbot couldn't respond. Please try again.",
  });
}
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});