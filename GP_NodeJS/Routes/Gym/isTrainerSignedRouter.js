import express from "express";
import { isTrainerSigned } from "../../Controllers/Gym/isTrainerSigned.js";

const router = express.Router();

router.post("/", isTrainerSigned);

export default router;
