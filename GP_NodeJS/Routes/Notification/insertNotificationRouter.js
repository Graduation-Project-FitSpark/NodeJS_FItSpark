import express from "express";
import { insertNotification } from "../../Controllers/Notification/insertNotification.js";

const router = express.Router();
router.post("/", insertNotification);

export default router;
