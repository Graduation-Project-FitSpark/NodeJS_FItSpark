import express from "express";
import { getNotifications } from "../../Controllers/Notification/getNotifications.js";

const router = express.Router();
router.post("/", getNotifications);

export default router;
