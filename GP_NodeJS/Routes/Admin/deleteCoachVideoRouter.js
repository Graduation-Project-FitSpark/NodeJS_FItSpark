import express from "express";
import { deleteCoachVideo } from "../../Controllers/Admin/deleteCoachVideo.js";

const router = express.Router();

router.post("/", deleteCoachVideo);

export default router;
