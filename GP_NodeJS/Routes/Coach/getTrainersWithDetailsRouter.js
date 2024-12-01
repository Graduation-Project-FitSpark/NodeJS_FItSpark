import express from "express";
import { getTrainersWithDetails } from "../../Controllers/Coach/getTrainersWithDetails.js";

const router = express.Router();
router.get("/", getTrainersWithDetails);

export default router;
