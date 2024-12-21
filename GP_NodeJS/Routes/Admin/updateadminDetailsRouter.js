import express from "express";
import { updateadminDetails } from "../../Controllers/Admin/updateadminDetails.js";

const router = express.Router();

router.post("/", updateadminDetails);

export default router;
