import express from "express";
import Internship from "../models/internship.model.js";
import NodeCache from "node-cache";

const router = express.Router();

const cache = new NodeCache({ stdTTL: 86400 });

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const cacheKey = `internships_${page}_${limit}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const skip = (page - 1) * limit;

    const internships = await Internship.find({ isActive: true })
      .select("title company deadline sourceUrl platform")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Internship.countDocuments({ isActive: true });

    const response = {
      data: internships,
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
    const internship = await Internship.findById(req.params.id).lean();
    if (!internship)
      return res.status(404).json({ message: "Internship not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;