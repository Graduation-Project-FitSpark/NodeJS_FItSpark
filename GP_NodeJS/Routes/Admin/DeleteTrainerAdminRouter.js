import express from "express";
import { DeleteTrainerAdmin } from "../../Controllers/Admin/DeleteTrainerAdmin.js";

const router = express.Router();

router.post("/", DeleteTrainerAdmin);

export default router;
