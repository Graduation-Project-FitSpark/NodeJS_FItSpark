import express from "express";
import { getTrainerWeekFoods } from "../../Controllers/Specialist/getTrainerWeekFoods.js";

const router = express.Router();

router.post("/", getTrainerWeekFoods);

export default router;
