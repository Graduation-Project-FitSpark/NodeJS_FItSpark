import express from "express";
import { deleteCoach } from "../../Controllers/Coach/deleteCoach.js";

const router = express.Router();
router.post("/", deleteCoach);
export default router;
