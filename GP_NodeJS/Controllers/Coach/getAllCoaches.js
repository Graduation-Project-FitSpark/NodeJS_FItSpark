import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import db from "../../db.js";

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

export const getAllCoaches = async (req, res) => {
  const query = "SELECT * FROM coach";
  db.query(query, async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No coaches found" });
    }

    try {
      const bucketName = "fitspark44";
      const coachesWithImages = await Promise.all(
        results.map(async (coach) => {
          const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: coach.Username,
          });

          let imageUrl = null;
          try {
            imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
          } catch (error) {
            console.error(
              `Error generating  URL for coach img${coach.Username}:`,
              error
            );
          }

          return {
            ...coach,
            Img: imageUrl,
          };
        })
      );

      return res.status(200).json({ coaches: coachesWithImages });
    } catch (error) {
      console.error("Error retrieving coaches with images:", error);
      return res.status(500).json({ error: "Failed to retrieve coaches." });
    }
  });
};
