import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/event.routes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import "./cron/devfolio.cron.js";
import "./cron/internshala.scrapeJobs.js";

dotenv.config();
const app = express();

// Middlewares
const corsOptions = {
  origin: ["https://eia-nu.vercel.app", "http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Database connection
connectDB();

app.get("/health", (req, res) => { //health check
  res.status(200).send("OK");
});

// Routes
app.get("/", (req, res) => res.send("EIA Backend API is running"));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
