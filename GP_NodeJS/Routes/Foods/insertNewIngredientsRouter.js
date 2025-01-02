import express from "express";
import { insertNewIngredients } from "../../Controllers/Foods/insertNewIngredients.js";

const router = express.Router();

router.post("/", insertNewIngredients);

export default router;
