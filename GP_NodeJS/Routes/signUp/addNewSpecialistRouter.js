import express from "express";
import { signUpSpecialist } from "../../Controllers/signUp/addNewSpecialist.js";

const router = express.Router();

router.post("/", signUpSpecialist);

export default router;
