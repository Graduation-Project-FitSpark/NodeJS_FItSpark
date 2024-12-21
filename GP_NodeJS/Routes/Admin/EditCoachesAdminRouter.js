import express from "express";
import EditCoachsAdmin from "../../Controllers/Admin/EditCoachesAdmin.js";

const router = express.Router();

router.post("/", EditCoachsAdmin);

export default router;
