import mongoose from "mongoose";

import AboutUs from "../models/aboutusModel.js";

export const trackAboutUs = async (req, res) => {
  try {
    const { page } = req.body;

    if (!page) {
      return res.status(400).json({ success: false, message: "Page is required" });
    }

    const newVisit = new AboutUs({ page });
    await newVisit.save();

    res.status(200).json({ success: true, message: "Visit tracked successfully" });
  } catch (error) {
    console.error("Visit track error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
