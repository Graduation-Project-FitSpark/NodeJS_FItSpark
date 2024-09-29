import express from "express";
import { signUpTrainer } from "../../Controllers/signUp/addNewTrainer.js";

const router = express.Router();

router.post("/", signUpTrainer);

export default router;
