import db from "../../db.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

const bucketName = "fitspark44";

export const getTrainersWithDetails = async (req, res) => {
  try {
    const query = "SELECT ID_Trainer, Username, Age FROM trainer";
    db.query(query, async (err, results) => {
      if (err) return res.status(500).json({ error: "Query failed" });
      const trainers = await Promise.all(
        results.map(async (trainer) => {
          const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: trainer.Username,
          });
          const img = await getSignedUrl(s3, command, { expiresIn: 3600 });
          return {
            ID_Trainer: trainer.ID_Trainer,
            name: trainer.Username,
            Age: trainer.Age,
            img,
          };
        })
      );
      res.status(200).json(trainers);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve trainers" });
  }
};
