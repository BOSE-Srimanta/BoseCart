import express from "express";
import { trackAboutUs } from "../controllers/aboutusController.js";
const router = express.Router();

router.post("/aboutus", trackAboutUs);

export default router;
