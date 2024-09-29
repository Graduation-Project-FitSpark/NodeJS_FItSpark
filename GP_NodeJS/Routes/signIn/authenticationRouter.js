import express from "express";
import { sendVerificationEmail } from "../../Controllers/signIn/authentication.js";

const router = express.Router();

router.post("/sendingVC", sendVerificationEmail);

export default router;
