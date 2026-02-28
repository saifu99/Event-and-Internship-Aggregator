import express from "express";
import Internship from "../models/internship.model.js";
import Hackathon from "../models/event.model.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js"; //OPTIONAL, WANT PROTECTED ROUTES

const router = express.Router();

//GET TOTAL INTERNSHIPS 
router.get("/internships/count", async (req, res) => {
  try {
    const count = await Internship.countDocuments({ isActive: true });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//GET TOTAL UPCOMING EVENTS (HACKATHONS)
router.get("/events/count", async (req, res) => {
  try {
    const count = await Hackathon.countDocuments({ isActive: true });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//PLACEHOLDER FOR PENDING APPLICATIONS 
router.get("/applications", async (req, res) => {
  const status = req.query.status || "pending";
  //FOR NOW, RETURN 0 SINCE YOU DON'T HAVE AN APPLICATIONMODEL YET
  res.json({ count: 0, status });
});

//PLACEHOLDER FOR NOTIFICATIONS 
router.get("/notifications", async (req, res) => {
  res.json({ count: 0, notifications: [] });
});

//PLACEHOLDER FOR WEEKLY APPLICATIONS CHART DATA  
router.get("/applications/weekly", async (req, res) => {
  //EXAMPLE: RETURN RANDOM DATA FOR 4 WEEKS 
  const data = [5, 10, 8, 12];
  res.json({ data, labels: ["Week 1", "Week 2", "Week 3", "Week 4"] });
});

//RECENT ACTIVITY PLACEHOLDER
router.get("/users/activity", async (req, res) => {
  //MOCK DATA 
  const activity = [
    { title: "Frontend Intern at ABC Corp", type: "Internship", date: "Jan 22, 2026" },
    { title: "React Workshop", type: "Event", date: "Jan 25, 2026" },
  ];
  res.json({ activity });
});

export default router;
