import express from "express";
import getTrainerSignedSpecialist from "../../Controllers/Trainer/getTrainerSignedSpecialist.js";

const router = express.Router();

router.post("/", getTrainerSignedSpecialist);

export default router;
