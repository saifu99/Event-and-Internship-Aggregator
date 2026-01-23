import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  sourceUrl: { type: String, unique: true },
  platform: String,
  type: String,
  verified: Boolean,
  isActive: Boolean,
  deadline: Date,
}, { timestamps: true });

export default mongoose.model("Internship", internshipSchema);
