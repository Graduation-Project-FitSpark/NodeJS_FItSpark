import express from "express";
import { getTrainerCalorieDetails } from "../../Controllers/Coach/getTrainerCalorieDetails.js";

const router = express.Router();
router.get("/", getTrainerCalorieDetails);

export default router;
