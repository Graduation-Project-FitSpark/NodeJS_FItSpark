import express from "express";
import { insertCoachPoints } from "../../Controllers/Coach/insertCoachPoints.js";

const router = express.Router();

router.post("/", insertCoachPoints);

export default router;
