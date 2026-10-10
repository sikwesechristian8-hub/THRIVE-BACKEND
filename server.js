const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("THRIVE API is running!");
});

app.post("/api/coach", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions:
        "You are THRIVE's AI Coach. Help users improve discipline, habits, goals, planning, and personal growth. Be encouraging, practical, and concise.",
      input: message
    });

    res.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error("AI Coach error:", error.message);
    res.status(500).json({
      error: "The AI Coach could not respond. Please try again."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`THRIVE API running on port ${PORT}`);
});
