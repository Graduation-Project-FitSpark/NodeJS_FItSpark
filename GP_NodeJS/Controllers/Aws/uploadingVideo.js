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

const uploadingVideo = [
  upload.single("video"),
  async (req, res) => {
    try {
      const { trainName } = req.body;
      const video = req.file;
      console.log(video);
      if (!trainName || !video) {
        return res
          .status(400)
          .json({ error: "trainName and video file are required" });
      }

      const params = {
        Bucket: "fitspark44",
        Key: `${trainName}/${video.originalname}`,
        Body: video.buffer,
        ContentType: "video/mp4",
      };

      await s3.putObject(params);

      const videoUrl = `https://fitspark44.s3.eu-north-1.amazonaws.com/${trainName}/${video.originalname}`;
      res
        .status(200)
        .json({ message: "Video uploaded successfully", videoUrl });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload" });
    }
  },
];

export default uploadingVideo;
