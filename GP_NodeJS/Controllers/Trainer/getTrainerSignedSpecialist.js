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

const getTrainerSignedSpecialist = (req, res) => {
  const { ID_Trainer } = req.body;

  if (!ID_Trainer) {
    return res.status(400).json({ error: "ID_Trainer is required" });
  }

  const trainerSpecialistQuery =
    "SELECT * FROM trainer_specialist WHERE ID_Trainer = ?";
  db.query(
    trainerSpecialistQuery,
    [ID_Trainer],
    async (err, trainerSpecialistResult) => {
      if (err) {
        console.error("Error executing trainer specialist query:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      if (trainerSpecialistResult.length === 0) {
        return res.status(404).json({ error: "Trainer not found" });
      }

      const trainerSpecialist = trainerSpecialistResult[0];

      if (!trainerSpecialist.ID_Specialist) {
        return res
          .status(404)
          .json({ error: "Trainer is not associated with a specialist" });
      }

      const { ID_Specialist } = trainerSpecialist;
      const specialistQuery =
        "SELECT * FROM specialist WHERE ID_specialist = ?";
      db.query(
        specialistQuery,
        [ID_Specialist],
        async (err, specialistResult) => {
          if (err) {
            console.error("Error executing specialist query:", err);
            return res.status(500).json({ error: "Database query failed" });
          }

          if (specialistResult.length === 0) {
            return res.status(404).json({ error: "specialist not found" });
          }

          const specialist = specialistResult[0];
          const { Username } = specialist;
          const key = `${Username}`;
          const bucketName = "fitspark44";
          const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
          });

          try {
            const imageUrl = await getSignedUrl(s3, command, {
              expiresIn: 3600,
            });

            const { First_Name, Last_Name } = specialist;
            return res.status(200).json({
              ID_Specialist,
              Name: `${First_Name} ${Last_Name}`,
              ImageUrl: imageUrl,
            });
          } catch (error) {
            console.error("Error retrieving image URL:", error);
            return res
              .status(500)
              .json({ error: "Failed to retrieve image URL" });
          }
        }
      );
    }
  );
};

export default getTrainerSignedSpecialist;
