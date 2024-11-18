import express from "express";
import { getTodayFoods } from "../../Controllers/Foods/getTodayFoods.js";

const router = express.Router();

router.get("/", getTodayFoods);

export default router;
