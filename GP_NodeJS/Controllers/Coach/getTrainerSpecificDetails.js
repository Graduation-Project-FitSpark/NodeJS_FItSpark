import db from "../../db.js";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

export const getTrainerSpecificDetails = async (req, res) => {
  try {
    const query = `
      SELECT 
        ID_Trainer, Gender, Class_Type, Location, 
        Activity_Level, Card_Number, Expression_Date, 
        CVC, Points, WatchedVideos, Token, Username
      FROM trainer
    `;

    db.query(query, async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }

      const trainers = await Promise.all(
        results.map(async (trainer) => {
          const { Username, ...otherDetails } = trainer;
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
            Image: imageUrl,
            Username,
          };
        })
      );

      res.status(200).json(trainers);
    });
  } catch (error) {
    console.error("Error retrieving trainer details:", error);
    res.status(500).json({ error: "Failed to retrieve trainer details" });
  }
};
