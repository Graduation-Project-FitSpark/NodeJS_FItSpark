import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

const getTrainerSignedCoach = (req, res) => {
  const { ID_Trainer } = req.body;

  if (!ID_Trainer) {
    return res.status(400).json({ error: "ID_Trainer is required" });
  }

  const trainerCoachQuery = "SELECT * FROM trainer_coach WHERE ID_Trainer = ?";
  db.query(trainerCoachQuery, [ID_Trainer], async (err, trainerCoachResult) => {
    if (err) {
      console.error("Error executing trainer coach query:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (trainerCoachResult.length === 0) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    const trainerCoach = trainerCoachResult[0];

    if (!trainerCoach.ID_Coach) {
      return res
        .status(404)
        .json({ error: "Trainer is not associated with a coach" });
    }

    const { ID_Coach } = trainerCoach;
    const coachQuery = "SELECT * FROM coach WHERE ID_Coach = ?";
    db.query(coachQuery, [ID_Coach], async (err, coachResult) => {
      if (err) {
        console.error("Error executing coach query:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      if (coachResult.length === 0) {
        return res.status(404).json({ error: "Coach not found" });
      }

      const coach = coachResult[0];
      const { Username } = coach;
      const key = `${Username}`; 
      const bucketName = "fitspark44";
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      try {
        const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        const { First_Name, Last_Name } = coach;
        return res.status(200).json({
          ID_Coach,
          Name: `${First_Name} ${Last_Name}`,
          ImageUrl: imageUrl,
        });
      } catch (error) {
        console.error("Error retrieving image URL:", error);
        return res.status(500).json({ error: "Failed to retrieve image URL" });
      }
    });
  });
};

export default getTrainerSignedCoach;
