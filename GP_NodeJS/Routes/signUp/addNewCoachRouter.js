import express from "express";
import { signUpCoach } from "../../Controllers/signUp/addNewCoach.js";

const router = express.Router();

router.post("/", signUpCoach);

export default router;
