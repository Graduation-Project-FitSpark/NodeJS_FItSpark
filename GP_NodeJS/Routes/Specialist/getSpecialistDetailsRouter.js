import express from "express";
import { getSpecialistDetails } from "../../Controllers/Specialist/getSpecialistDetails.js";
const router = express.Router();
router.post("/", getSpecialistDetails);
export default router;
