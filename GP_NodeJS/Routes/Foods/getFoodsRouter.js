import express from "express";
import { getFoods } from "../../Controllers/Foods/getFoods.js";

const router = express.Router();

router.get("/", getFoods);

export default router;
