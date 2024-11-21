import express from "express";
import { getGymLocation } from "../../Controllers/Gym/getGymLocation.js";

const router = express.Router();

router.post("/", getGymLocation);

export default router;
