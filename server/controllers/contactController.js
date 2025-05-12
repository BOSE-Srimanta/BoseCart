import Contact from "../models/contactModel.js";
import mongoose from "mongoose";

export const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        res.status(200).json({ success: true, message: "Message received successfully" });
    } catch (error) {
        console.error("Contact form submission error:", error.message);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
