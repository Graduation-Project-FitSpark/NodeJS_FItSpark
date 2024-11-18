import express from "express";
import storeResults from "../../Controllers/Quiz/storeResult.js";

const router = express.Router();

router.post("/", storeResults);

export default router;
