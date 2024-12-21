import express from "express";
import { DeleteCoachAdmin } from "../../Controllers/Admin/DeleteCoachAdmin.js";

const router = express.Router();

router.post("/", DeleteCoachAdmin);

export default router;
