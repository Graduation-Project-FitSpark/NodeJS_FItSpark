import express from "express";
import { updateSpecialistDetails } from "../../Controllers/Specialist/updateSpecialistDetails.js";

const router = express.Router();

router.post("/", updateSpecialistDetails);

export default router;
