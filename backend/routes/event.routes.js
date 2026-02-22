import express from "express";
import Event from "../models/event.model.js";
import NodeCache from "node-cache";

const router = express.Router();

// Cache for 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 86400 });

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const cacheKey = `events_${page}_${limit}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const skip = (page - 1) * limit;

    const events = await Event.find({ isActive: true })
      .select("title platform deadline sourceUrl")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Event.countDocuments({ isActive: true });

    const response = {
      data: events,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    };

    cache.set(cacheKey, response);

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;