import express from "express";
import { getAllSalesTrainers } from "../../Controllers/Sales/getAllSalesTrainers.js";

const router = express.Router();

router.get("/", getAllSalesTrainers);

export default router;
