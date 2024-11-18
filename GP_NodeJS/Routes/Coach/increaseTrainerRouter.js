import express from "express";
import { increaseCoachTrainerCount } from "../../Controllers/Coach/increaseCoachTrainerCount.js";

const router = express.Router();
router.post("/", increaseCoachTrainerCount);

export default router;
