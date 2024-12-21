import express from "express";
import EditSpecialistsAdmin from "../../Controllers/Admin/EditSpecialistsAdmin.js";

const router = express.Router();

router.post("/", EditSpecialistsAdmin);

export default router;
