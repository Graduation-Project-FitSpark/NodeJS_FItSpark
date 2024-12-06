import express from "express";
import { insertSpecialistPoints } from "../../Controllers/Specialist/insertSpecialistPoints.js";

const router = express.Router();

router.post("/", insertSpecialistPoints);

export default router;
