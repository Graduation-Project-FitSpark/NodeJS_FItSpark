import { S3 } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

const uploadProfileImg = async (req, res) => {
  try {
    const { username, img } = req.body;
    console.log("Username", username);
    console.log("Image:", img);
    if (!username || !img) {
      return res
        .status(400)
        .json({ error: "Username and image file are required" });
    }

    const buffer = Buffer.from(img, "base64");

    const params = {
      Bucket: "fitspark44",
      Key: username,
      Body: buffer,
      ContentType: "image/jpeg",
    };

    await s3.putObject(params);

    const imageUrl = `https://fitspark44.s3.eu-north-1.amazonaws.com/${username}`;
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

export default uploadProfileImg;
