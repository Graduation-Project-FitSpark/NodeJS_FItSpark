import express from "express";
import { getCoachDetails } from "../../Controllers/Coach/getCoachDetails.js";
const router = express.Router();
router.post("/", getCoachDetails);
export default router;
