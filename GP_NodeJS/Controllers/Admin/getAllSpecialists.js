import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import db from "../../db.js";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

const getAllSpecialists = async (req, res) => {
  try {
    const query = `SELECT * FROM specialist`;

    db.query(query, async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }

      const specialists = await Promise.all(
        results.map(async (specialist) => {
          const { Username, ...otherDetails } = specialist;
          let imageUrl = null;

          try {
            const command = new GetObjectCommand({
              Bucket: "fitspark44",
              Key: Username,
            });
            imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
          } catch (error) {
            console.error("Error fetching image from AWS:", error);
          }

          return {
            ...otherDetails,
            Img: imageUrl,
            Username,
          };
        })
      );

      res.status(200).json(specialists);
    });
  } catch (error) {
    console.error("Error retrieving spec:", error);
    res.status(500).json({ error: "Failed to return specialists details" });
  }
};

export default getAllSpecialists;
