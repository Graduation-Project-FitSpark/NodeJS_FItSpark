import express from "express";
import { uploadOrder } from "../../Controllers/Sales/uploadOrder.js";

const router = express.Router();

router.post("/", uploadOrder);

export default router;
