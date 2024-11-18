import express from "express";
import { getWorks } from "../../Controllers/Trains/getWorks.js";

const router = express.Router();

router.post("/", getWorks);

export default router;
