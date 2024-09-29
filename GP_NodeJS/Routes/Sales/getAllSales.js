import express from "express";
import { getAllSales } from "../../Controllers/Sales/getAllSales.js";

const router = express.Router();
router.get("/", getAllSales);
export default router;
