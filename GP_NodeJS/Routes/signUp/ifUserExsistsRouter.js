import express from "express";
import { ifUserExsists } from "../../Controllers/signUp/ifUserExsists.js";

const router = express.Router();

router.post("/", ifUserExsists);

export default router;
