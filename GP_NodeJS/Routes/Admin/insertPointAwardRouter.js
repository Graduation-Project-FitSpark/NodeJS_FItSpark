import express from "express";
import insertPointAward from "../../Controllers/Admin/insertPointAward.js";

const router = express.Router();

router.post("/", insertPointAward);

export default router;
