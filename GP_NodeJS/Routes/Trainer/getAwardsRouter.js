import express from "express";
import { getAwards } from "../../Controllers/Trainer/getAwards.js";

const router = express.Router();

router.get("/", getAwards);

export default router;
