import express from "express";
import { getTrainerCoach } from "../../Controllers/Coach/getTrainerCoach.js";

const router = express.Router();
router.get("/", getTrainerCoach);

export default router;
