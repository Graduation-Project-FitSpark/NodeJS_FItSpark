import express from "express";
import { updateCalorieSteps } from "../../Controllers/Calories/updateCalorieSteps.js";

const router = express.Router();

router.post("/", updateCalorieSteps);

export default router;
