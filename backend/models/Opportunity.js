import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  title: String,
  sourceUrl: { type: String, unique: true },
  platform: String,
  type: String,
  verified: Boolean,
  isActive: Boolean
}, { timestamps: true });

export default mongoose.model("Opportunity", opportunitySchema);
