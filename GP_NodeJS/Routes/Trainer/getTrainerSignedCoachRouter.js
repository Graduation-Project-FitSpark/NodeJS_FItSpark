import express from "express";
import getTrainerSignedCoach from "../../Controllers/Trainer/getTrainerSignedCoach.js";

const router = express.Router();

router.post("/", getTrainerSignedCoach);

export default router;
