import express from "express";
import { getTodayTrains } from "../../Controllers/Trains/getTodayTrains.js";

const router = express.Router();

router.post("/", getTodayTrains);

export default router;
