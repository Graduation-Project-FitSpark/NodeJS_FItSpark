import express from "express";
import { checkCoachResponse } from "../../Controllers/Coach/checkCoachResponse.js";
const router = express.Router();
router.post("/", checkCoachResponse);
export default router;
