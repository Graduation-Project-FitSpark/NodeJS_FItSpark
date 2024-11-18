import express from "express";
import { updateTrainerDetails } from "../../Controllers/Trainer/updateTrainerDetails.js";

const router = express.Router();

router.post("/", updateTrainerDetails);

export default router;
