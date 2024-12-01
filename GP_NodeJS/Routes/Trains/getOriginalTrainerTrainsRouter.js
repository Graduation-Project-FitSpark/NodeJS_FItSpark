import express from "express";
import { getOriginalTrainerTrains } from "../../Controllers/Trains/getOriginalTrainerTrains.js";

const router = express.Router();

router.post("/", getOriginalTrainerTrains);

export default router;
