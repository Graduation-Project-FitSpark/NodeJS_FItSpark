import express from "express";
import { getTrainerSpecificDetails } from "../../Controllers/Coach/getTrainerSpecificDetails.js";

const router = express.Router();
router.get("/", getTrainerSpecificDetails);

export default router;
