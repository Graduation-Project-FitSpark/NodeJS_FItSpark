import express from "express";
import { getAllLocations } from "../../Controllers/Admin/getAllLocations.js";

const router = express.Router();

router.get("/", getAllLocations);

export default router;
