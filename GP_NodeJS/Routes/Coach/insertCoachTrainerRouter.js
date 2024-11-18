import express from "express";
import { insertCoachTrainer } from "../../Controllers/Coach/insertCoachTrainer.js";

const router = express.Router();

router.post("/", insertCoachTrainer);

export default router;
