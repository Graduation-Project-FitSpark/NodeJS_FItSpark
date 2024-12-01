import express from "express";
import { processRequestsCoach } from "../../Controllers/Coach/processRequestsCoach.js";

const router = express.Router();

router.post("/", processRequestsCoach);

export default router;
