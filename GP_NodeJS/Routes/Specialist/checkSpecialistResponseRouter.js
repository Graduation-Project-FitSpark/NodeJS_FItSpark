import express from "express";
import { checkSpecialistResponse } from "../../Controllers/Specialist/checkSpecialistResponse.js";
const router = express.Router();
router.post("/", checkSpecialistResponse);
export default router;
