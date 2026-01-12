import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import "./cron/scrapeJobs.js";
import { scrapeDevfolio } from "./scrapers/devfolioScraper.js";

scrapeDevfolio();


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("CEIA Backend API is running");
});

// Auth route (make sure the slash is added)
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
