import express from "express";
import { getIngradients } from "../../Controllers/Foods/getIngradients.js";

const router = express.Router();

router.post("/", getIngradients);

export default router;
