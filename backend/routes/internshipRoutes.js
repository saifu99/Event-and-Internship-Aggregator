import express from "express";
import Internship from "../models/internship.model.js";

const router = express.Router();

// GET all active internships (latest first)
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find({ isActive: true })
      .sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single internship by ID
router.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Internship not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
