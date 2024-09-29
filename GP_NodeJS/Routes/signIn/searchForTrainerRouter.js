import express from "express";
import { searchForTrainer } from "../../Controllers/signIn/searchForTrainer.js";

const router = express.Router();

router.post("/", searchForTrainer);

export default router;
