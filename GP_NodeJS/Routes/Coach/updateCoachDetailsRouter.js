import express from "express";
import { updateCoachDetails } from "../../Controllers/Coach/updateCoachDetails.js";

const router = express.Router();

router.post("/", updateCoachDetails);

export default router;
