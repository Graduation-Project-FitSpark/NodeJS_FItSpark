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

export const getAllLocations = async (req, res) => {
  try {
    const queryTrainer = "SELECT Username, Location FROM trainer";
    const queryCoach = "SELECT Username, Location FROM coach";
    const querySpecialist = "SELECT Username, Location FROM specialist";

    const [trainerResults] = await db.promise().query(queryTrainer);
    const [coachResults] = await db.promise().query(queryCoach);
    const [specialistResults] = await db.promise().query(querySpecialist);

    const allLocations = [
      ...trainerResults,
      ...coachResults,
      ...specialistResults,
    ];

    const locationsWithImages = await Promise.all(
      allLocations.map(async (location) => {
        const { Username, ...otherDetails } = location;
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
          img: imageUrl,
          Username,
        };
      })
    );

    res.status(200).json(locationsWithImages);
  } catch (error) {
    console.error("Error retrieving locations:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve locations from the database" });
  }
};
