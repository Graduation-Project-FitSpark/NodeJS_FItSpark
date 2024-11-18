import express from "express";
import { deleteSpecialist } from "../../Controllers/Specialist/deleteSpecialist.js";

const router = express.Router();
router.post("/", deleteSpecialist);
export default router;
