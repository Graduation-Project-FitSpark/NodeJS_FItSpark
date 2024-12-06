import express from "express";
import { editTrainerFoods } from "../../Controllers/Specialist/editTrainerFoods.js";

const router = express.Router();

router.post("/", editTrainerFoods);

export default router;
