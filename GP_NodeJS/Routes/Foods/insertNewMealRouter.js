import express from "express";
import { insertNewMeal } from "../../Controllers/Foods/insertNewMeal.js";

const router = express.Router();

router.post("/", insertNewMeal);

export default router;
