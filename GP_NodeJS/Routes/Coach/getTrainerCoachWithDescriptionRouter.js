import express from "express";
import { getTrainerCoachWithDescription } from "../../Controllers/Coach/getTrainerCoachWithDescription.js";

const router = express.Router();

router.get("/", getTrainerCoachWithDescription);

export default router;
