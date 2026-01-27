import express from "express";
import Event from "../models/event.model.js";

const router = express.Router();

// GET all active opportunities, latest first
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .sort({ createdAt: -1 }); // newest first
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single opportunity by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
