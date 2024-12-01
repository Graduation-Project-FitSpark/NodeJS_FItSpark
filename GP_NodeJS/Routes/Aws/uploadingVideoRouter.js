import express from "express";
import uploadingVideo from "../../Controllers/Aws/uploadingVideo.js";

const router = express.Router();

router.post("/", uploadingVideo);

export default router;
