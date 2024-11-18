import express from "express";
import { increaseSpecialistTrainerCount } from "../../Controllers/Specialist/increaseSpecialistTrainerCount.js";

const router = express.Router();

router.post("/", increaseSpecialistTrainerCount);

export default router;
