import express from "express";
import { processRequestsSpecialist } from "../../Controllers/Specialist/processRequestsSpecialist.js";

const router = express.Router();

router.post("/", processRequestsSpecialist);

export default router;
