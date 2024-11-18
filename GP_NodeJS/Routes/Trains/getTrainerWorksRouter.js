import express from "express";
import { getTrainerWorks } from "../../Controllers/Trains/getTrainerWorks.js";

const router = express.Router();

router.post("/", getTrainerWorks);

export default router;
