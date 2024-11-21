import express from "express";
import { uploadToken } from "../../Controllers/Notification/uploadToken.js";

const router = express.Router();
router.post("/", uploadToken);

export default router;
