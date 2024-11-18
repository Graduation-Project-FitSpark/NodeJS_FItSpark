import express from "express";
import getProfileImage from "../../Controllers/Aws/getProfileImage.js";

const router = express.Router();

router.post("/", getProfileImage);

export default router;
