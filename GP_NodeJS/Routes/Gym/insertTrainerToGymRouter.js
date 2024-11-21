import express from "express";
import { insertTrainerToGym } from "../../Controllers/Gym/insertTrainerToGym.js";

const router = express.Router();

router.post("/", insertTrainerToGym);

export default router;
