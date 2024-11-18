import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

const getProfileImage = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const key = `${username}`;
    const bucketName = "fitspark44";

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error retrieving image URL:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to retrieve image URL" });
  }
};

export default getProfileImage;
