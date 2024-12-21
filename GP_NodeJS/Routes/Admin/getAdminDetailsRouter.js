import express from "express";
import getAdminDetails from "../../Controllers/Admin/getAdminDetails.js";

const router = express.Router();

router.get("/", getAdminDetails);

export default router;
