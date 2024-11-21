import express from "express";
import { getGyms } from "../../Controllers/Gym/getGyms.js";

const router = express.Router();

router.get("/", getGyms);

export default router;
