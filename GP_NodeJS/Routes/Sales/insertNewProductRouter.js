import express from "express";
import { insertNewProduct } from "../../Controllers/Sales/insertNewProduct.js";

const router = express.Router();

router.post("/", insertNewProduct);

export default router;
