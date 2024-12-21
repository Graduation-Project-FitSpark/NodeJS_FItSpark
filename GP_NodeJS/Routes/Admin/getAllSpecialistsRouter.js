import express from "express";
import getAllSpecialists from "../../Controllers/Admin/getAllSpecialists.js";

const router = express.Router();

router.get("/", getAllSpecialists);

export default router;
