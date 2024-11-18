import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ListObjectsCommand, S3, GetObjectCommand } from "@aws-sdk/client-s3";
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

export const getWorks = (req, res) => {
  const query =
    "SELECT ID_Trains, Train_Name, Description, Url_Img, cal FROM trains";

  db.query(query, async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    try {
      const works = await Promise.all(
        results.map(async (train) => {
          const params = {
            Bucket: "fitspark44",
            Prefix: `${train.Train_Name}/`,
            ResponseContentType: "video/mp4",
          };

          const data = await s3.send(new ListObjectsCommand(params));

          const allFiles = data.Contents
            ? await Promise.all(
                data.Contents.map(async (item) => {
                  if (item.Key.endsWith(".mp4")) {
                    return await getSignedUrl(
                      s3,
                      new GetObjectCommand({
                        Bucket: "fitspark44",
                        Key: item.Key,
                      })
                    );
                  }
                })
              )
            : [];

          return {
            id: train.ID_Trains,
            name: train.Train_Name,
            description: train.Description,
            goal: 50,
            progress: 0,
            imageUrl: train.Url_Img,
            videolink: allFiles.filter(Boolean),
            cal: train.cal,
          };
        })
      );

      res.status(200).json(works);
    } catch (error) {
      console.error("Error processing videos:", error);
      res.status(500).json({
        error: error.message || "Failed to fetch works.",
      });
    }
  });
};
