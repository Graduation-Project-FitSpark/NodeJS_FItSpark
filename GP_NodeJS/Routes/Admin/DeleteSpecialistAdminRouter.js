import express from "express";
import { DeleteSpecialistAdmin } from "../../Controllers/Admin/DeleteSpecialistAdmin.js";

const router = express.Router();

router.post("/", DeleteSpecialistAdmin);

export default router;
