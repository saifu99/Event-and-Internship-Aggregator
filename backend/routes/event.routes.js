import express from "express";
import Event from "../models/event.model.js";

const router = express.Router();

// GET paginated active events
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const events = await Event.find(
      { isActive: true },
      "title sourceUrl platform deadline location participants applyUrl createdAt"
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      page,
      limit,
      data: events,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;