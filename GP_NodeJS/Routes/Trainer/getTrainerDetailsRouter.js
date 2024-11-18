import express from "express";
import { getTrainerDetails } from "../../Controllers/Trainer/getTrainerDetails.js";

const router = express.Router();

router.post("/", getTrainerDetails);

export default router;
