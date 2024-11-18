import express from "express";
import { isUserResultExists } from "../../Controllers/Quiz/isUserResultExsists.js";

const router = express.Router();

router.post("/", isUserResultExists);

export default router;
