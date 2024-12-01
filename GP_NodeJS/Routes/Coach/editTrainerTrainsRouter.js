import express from "express";
import { editTrainerTrains } from "../../Controllers/Coach/editTrainerTrains.js";

const router = express.Router();
router.post("/", editTrainerTrains);

export default router;
