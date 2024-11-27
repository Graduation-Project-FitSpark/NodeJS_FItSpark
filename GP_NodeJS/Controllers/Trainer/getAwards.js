import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import db from "../../db.js";

dotenv.config();

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

export const getAwards = (req, res) => {
  const query = "SELECT point, name FROM awards";

  db.query(query, async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    try {
      const awardsWithImageUrls = await Promise.all(
        results.map(async (award) => {
          const imageKey = `Awards/${award.point}.jpg`;

          const command = new GetObjectCommand({
            Bucket: "fitspark44",
            Key: imageKey,
          });
          const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
          return {
            ...award,
            photoUrl: imageUrl,
          };
        })
      );

      return res.status(200).json({ awards: awardsWithImageUrls });
    } catch (error) {
      console.error("Error generating image URL:", error);
      return res.status(500).json({ error: "Failed to generate image URLs" });
    }
  });
};
