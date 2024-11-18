import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ListObjectsCommand, S3, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

export const gettingVidoes = async (req, res) => {
  try {
    const { trainName } = req.body;
    const params = {
      Bucket: "fitspark44",
      Prefix: `${trainName}/`,
    };

    const data = await s3.send(new ListObjectsCommand(params));

    if (!data.Contents || data.Contents.length === 0) {
      throw new Error(`No videos found for train: ${trainName}`);
    }

    const urls = await Promise.all(
      data.Contents.map(async (item) => {
        return await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: "fitspark44",
            Key: item.Key,
          })
        );
      })
    );

    res.status(200).json({ urls });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message || "Failed to retrieve video URLs." });
  }
};
