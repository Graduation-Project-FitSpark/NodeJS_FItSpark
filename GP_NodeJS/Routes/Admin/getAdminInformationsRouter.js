import express from "express";
import { getAdminInformations } from "../../Controllers/Admin/getAdminInformations.js";

const router = express.Router();

router.get("/", getAdminInformations);

export default router;
