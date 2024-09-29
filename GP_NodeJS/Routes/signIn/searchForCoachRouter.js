import express from "express";
import { searchForCoach } from "../../Controllers/signIn/searchForCoach.js";

const router = express.Router();

router.post("/", searchForCoach);

export default router;
