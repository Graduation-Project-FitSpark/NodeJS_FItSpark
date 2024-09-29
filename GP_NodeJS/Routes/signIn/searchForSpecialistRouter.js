import express from "express";
import { searchForSpecialist } from "../../Controllers/signIn/searchForSpecialist.js";

const router = express.Router();

router.post("/", searchForSpecialist);

export default router;
