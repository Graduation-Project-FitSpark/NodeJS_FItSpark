import express from "express";
import { getAllCoaches } from "../../Controllers/Coach/getAllCoaches.js";
const router = express.Router();
router.get("/", getAllCoaches);
export default router;
