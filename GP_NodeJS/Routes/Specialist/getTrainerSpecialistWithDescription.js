import express from "express";
import { getTrainerSpecialistWithDescription } from "../../Controllers/Specialist/getTrainerSpecialistWithDescription.js";

const router = express.Router();

router.get("/", getTrainerSpecialistWithDescription);

export default router;
