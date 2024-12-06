import express from "express";
import { getTrainerSpecialist } from "../../Controllers/Specialist/getTrainerSpecialist.js";

const router = express.Router();
router.get("/", getTrainerSpecialist);

export default router;
