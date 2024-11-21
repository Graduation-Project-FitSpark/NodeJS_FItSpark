import express from "express";
import { getTrainerLocation } from "../../Controllers/Gym/getTrainerLocation.js";

const router = express.Router();

router.post("/", getTrainerLocation);

export default router;
