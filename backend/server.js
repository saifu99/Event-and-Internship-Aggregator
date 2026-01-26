import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import opportunityRoutes from "./routes/hackathon.routes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import "./cron/devfolio.cron.js";
import "./cron/internshala.scrapeJobs.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.get("/", (req, res) => res.send("CEIA Backend API is running"));

app.use("/api/auth", authRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/internships", internshipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
