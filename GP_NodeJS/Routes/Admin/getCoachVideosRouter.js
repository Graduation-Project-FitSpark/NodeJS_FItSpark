import express from "express";
import { getCoachVideos } from "../../Controllers/Admin/getCoachVideos.js";

const router = express.Router();

router.get("/", getCoachVideos);

export default router;
