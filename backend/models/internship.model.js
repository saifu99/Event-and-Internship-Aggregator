import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },

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
  },
  { timestamps: true }
);

/* COMPOUND INDEX FOR FILTER + SORT  */
internshipSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.model("Internship", internshipSchema);