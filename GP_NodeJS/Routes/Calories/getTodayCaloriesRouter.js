import express from "express";
import { getTodayCalories } from "../../Controllers/Calories/getTodayCalories.js";

const router = express.Router();

router.post("/", getTodayCalories);

export default router;
