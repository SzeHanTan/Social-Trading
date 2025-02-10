import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5177"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Add CORS middleware for REST endpoints
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5177"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("GEMINI_API_KEY:", GEMINI_API_KEY ? "Set" : "Not set");

// Function to call Google Gemini API
async function queryGemini(input) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(input);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to query Gemini API");
  }
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('chat message', async (message) => {
    try {
      const response = await queryGemini(message);
      socket.emit('chat response', response);
    } catch (error) {
      socket.emit('chat error', 'Failed to process message');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// API endpoint to get Gemini response
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);

  try {
    const aiResponse = await queryGemini(message);
    console.log("AI Response:", aiResponse);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

const port = process.env.PORT || 5000;

// Use httpServer instead of app.listen
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});