import express from "express";
import { getPoints } from "../../Controllers/Trainer/getPoints.js";

const router = express.Router();

router.post("/", getPoints);

export default router;
