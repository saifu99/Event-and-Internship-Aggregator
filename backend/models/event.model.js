import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    sourceUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    platform: { type: String, index: true },
    type: { type: String },
    verified: { type: Boolean, default: false },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    deadline: { type: Date },
    location: { type: String },
    participants: { type: Number },
    applyUrl: { type: String },
  },
  { timestamps: true }
);

/* 🚀 Compound index for filter + sort */
eventSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.model("Event", eventSchema);