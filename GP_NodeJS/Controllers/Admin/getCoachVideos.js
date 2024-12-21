import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ListObjectsCommand, S3, GetObjectCommand } from "@aws-sdk/client-s3";
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

export const getCoachVideos = async (req, res) => {
  try {
    const query = "SELECT Train_Name FROM trains";

    db.query(query, async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch trains" });
      }

      const trains = results.map((row) => row.Train_Name);
      const result = [];

      for (const trainName of trains) {
        const trainParams = {
          Bucket: "fitspark44",
          Prefix: `${trainName}/`,
        };

        const trainVideosData = await s3.send(
          new ListObjectsCommand(trainParams)
        );

        if (
          !trainVideosData.Contents ||
          trainVideosData.Contents.length === 0
        ) {
          continue;
        }

        const videos = [];

        for (const item of trainVideosData.Contents) {
          const videoKey = item.Key;

          if (videoKey.includes("@@@")) {
            const usernameWithPath = videoKey.split("/").pop();
            const username = usernameWithPath.split("@@@")[0];
            const fileName = usernameWithPath;

            const imageKey = `${username}`;
            let imageUrl = null;

            try {
              imageUrl = await getSignedUrl(
                s3,
                new GetObjectCommand({
                  Bucket: "fitspark44",
                  Key: imageKey,
                }),
                { expiresIn: 3600 }
              );
            } catch (error) {
              console.warn(`No image found for username: ${username}`);
            }

            const videoUrl = await getSignedUrl(
              s3,
              new GetObjectCommand({
                Bucket: "fitspark44",
                Key: videoKey,
              }),
              { expiresIn: 3600 }
            );

            videos.push({
              Video_URL: videoUrl,
              Username: username,
              Coach_Image: imageUrl,
              File_Name: fileName,
            });
          }
        }

        result.push({
          Train_Name: trainName,
          Videos: videos,
        });
      }

      res.status(200).json(result);
    });
  } catch (error) {
    console.error("Error fetching coach videos:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch coach videos." });
  }
};
