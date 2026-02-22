import express from "express";
import Internship from "../models/internship.model.js";

const router = express.Router();

// GET paginated active internships
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const internships = await Internship.find(
      { isActive: true },
      "title company sourceUrl platform deadline createdAt"
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      page,
      limit,
      data: internships,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single internship
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