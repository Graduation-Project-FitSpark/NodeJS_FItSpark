import express from "express";
import { gettingVidoes } from "../../Controllers/Aws/gettingVideos.js";

const router = express.Router();

router.get("/", gettingVidoes);

export default router;
