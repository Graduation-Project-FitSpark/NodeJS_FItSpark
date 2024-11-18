import express from "express";
import { getAllFoodsTrainer } from "../../Controllers/Foods/getAllFoodsTrainer.js";

const router = express.Router();

router.post("/", getAllFoodsTrainer);

export default router;
