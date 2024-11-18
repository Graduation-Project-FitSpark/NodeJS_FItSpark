import express from "express";
import { insertSpecialistTrainer } from "../../Controllers/Specialist/insertSpecialistTrainer.js";

const router = express.Router();

router.post("/", insertSpecialistTrainer);

export default router;
