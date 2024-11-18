import express from "express";
import { getAllFoods } from "../../Controllers/Foods/getAllFoods.js";

const router = express.Router();

router.get("/", getAllFoods);

export default router;
