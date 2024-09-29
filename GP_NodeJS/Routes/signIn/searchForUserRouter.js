import express from "express";
import { searchForUser } from "../../Controllers/signIn/searchForUser.js";

const router = express.Router();

router.post("/", searchForUser);

export default router;
