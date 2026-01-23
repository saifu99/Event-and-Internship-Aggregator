import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    sourceUrl: {
      type: String,
      unique: true,
      required: true
    },

    platform: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["hackathon", "internship"],
      required: true
    },

    verified: {
      type: Boolean,
      default: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    deadline: {
      type: Date,
      default: null
    },

    location: {
      type: String,
      default: "Online / Unknown"
    },

    participants: {
      type: Number,
      default: 0
    },

    applyUrl: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Opportunity", opportunitySchema);
