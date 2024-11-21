import express from "express";
import { sendNotification } from "../../Controllers/Notification/sendingNotificaion.js";

const router = express.Router();
router.post("/", sendNotification);

export default router;
