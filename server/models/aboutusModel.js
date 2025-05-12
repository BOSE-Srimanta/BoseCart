import mongoose from "mongoose";

const AboutUsSchema = new mongoose.Schema({
  page: { type: String, required: true },
  AboutUsAt: { type: Date, default: Date.now },
});

export default mongoose.model("AboutUs", AboutUsSchema);
