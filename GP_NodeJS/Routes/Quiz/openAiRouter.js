import express from "express";
import { sendMessageToOpenAI } from "../../Controllers/Quiz/openAi.js";

const router = express.Router();

router.post("/", sendMessageToOpenAI);

export default router;
