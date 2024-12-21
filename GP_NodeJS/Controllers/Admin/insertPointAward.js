import { S3 } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import db from "../../db.js";
import multer from "multer";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});
const insertPointAward = async (req, res) => {
  try {
    const { point, name, img } = req.body;

    if (!point || !name || !img) {
      return res
        .status(400)
        .json({ error: "Point, name, and image are required" });
    }

    const buffer = Buffer.from(img, "base64");

    const params = {
      Bucket: "fitspark44",
      Key: `Awards/${point}.jpg`,
      Body: buffer,
      ContentType: "image/jpeg",
    };

    await s3.putObject(params);

    const imageUrl = `https://fitspark44.s3.eu-north-1.amazonaws.com/Awards/${point}.jpg`;

    const query = `
      INSERT INTO awards (point, name, photo)
      VALUES (?, ?, NULL);
    `;
    const values = [point, name];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Insert error:", error);
        return res.status(500).json({ error: "Failed to insert award" });
      }

      res.status(200).json({
        message: "Award inserted successfully",
        data: results.insertId,
        imageUrl,
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

export default insertPointAward;
