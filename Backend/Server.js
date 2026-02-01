import express from "express"; import cors from "cors"; import dotenv from "dotenv"; import OpenAl from "openai";

dotenv.config();

const app = express(); app.use(cors()); app.use(express.json());

const openai = new OpenAI({

apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => { try {

const userMessage = req.body.message;

const completion = await openai.chat.completions.create({ model: "gpt-40-mini", messages: [ { role: "system", content: "You are an expert Al and Machine Learning tutor. Explain concepts simply with examples." },

{ role: "user", content: userMessage } 1 });

res.json({ reply: completion.choices[0].messa ge.content });

} catch (error) { res.status(500).json({ error: "Al service error" }); } });

app.listen(3000, () => { console.log("ML/AI Chatbot running on port 3000"); });
