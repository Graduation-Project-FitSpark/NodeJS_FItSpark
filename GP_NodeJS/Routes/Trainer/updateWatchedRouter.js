import express from "express";
import { updateWatched } from "../../Controllers/Trainer/updateWatched.js";

const router = express.Router();

router.post("/", updateWatched);

export default router;
