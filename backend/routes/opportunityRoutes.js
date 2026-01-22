// routes/opportunityRoutes.js
import express from "express";
import Opportunity from "../models/Opportunity.js";

const router = express.Router();

// GET all active opportunities, latest first
router.get("/", async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ isActive: true })
      .sort({ createdAt: -1 }); // newest first
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single opportunity by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Opportunity.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
