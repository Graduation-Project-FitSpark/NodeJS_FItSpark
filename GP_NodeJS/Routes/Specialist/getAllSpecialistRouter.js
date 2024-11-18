import express from "express";
import { getAllSpecialists } from "../../Controllers/Specialist/getAllSpecialist.js";

const router = express.Router();
router.get("/", getAllSpecialists);

export default router;
