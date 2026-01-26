import express from "express";
import Internship from "../models/internship.model.js";
import Hackathon from "../models/hackathon.model.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js"; // optional, if you want protected routes

const router = express.Router();

// Get total internships
router.get("/internships/count", async (req, res) => {
  try {
    const count = await Internship.countDocuments({ isActive: true });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get total upcoming events (hackathons)
router.get("/opportunities/count", async (req, res) => {
  try {
    const count = await Hackathon.countDocuments({ isActive: true });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Placeholder for pending applications
router.get("/applications", async (req, res) => {
  const status = req.query.status || "pending";
  // For now, return 0 since you don't have an Application model yet
  res.json({ count: 0, status });
});

// Placeholder for notifications
router.get("/notifications", async (req, res) => {
  res.json({ count: 0, notifications: [] });
});

// Placeholder for weekly applications chart data
router.get("/applications/weekly", async (req, res) => {
  // Example: return random data for 4 weeks
  const data = [5, 10, 8, 12];
  res.json({ data, labels: ["Week 1", "Week 2", "Week 3", "Week 4"] });
});

// Recent activity placeholder
router.get("/users/activity", async (req, res) => {
  // Mock data
  const activity = [
    { title: "Frontend Intern at ABC Corp", type: "Internship", date: "Jan 22, 2026" },
    { title: "React Workshop", type: "Event", date: "Jan 25, 2026" },
  ];
  res.json({ activity });
});

export default router;
