import express from "express";
import { updatePoints } from "../../Controllers/Trainer/updatePoints.js";

const router = express.Router();

router.post("/", updatePoints);

export default router;
