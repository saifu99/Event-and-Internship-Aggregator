import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  sourceUrl: { type: String, unique: true },
  platform: String,
  type: String,
  verified: Boolean,
  isActive: Boolean,
  deadline: Date,
  location: String,
  participants: Number,
  applyUrl: String,
});

export default mongoose.model("Event", eventSchema);
