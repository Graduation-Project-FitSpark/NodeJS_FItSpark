import express from "express";
import uploadProfileImg from "../../Controllers/Aws/uploadProfileImg.js";

const router = express.Router();

router.post("/", uploadProfileImg);

export default router;
