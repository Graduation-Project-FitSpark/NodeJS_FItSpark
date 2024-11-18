import express from "express";
import { getTrains } from "../../Controllers/Trains/getTrains.js";

const router = express.Router();

router.get("/", getTrains);

export default router;
