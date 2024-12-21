import { S3, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

export const deleteCoachVideo = async (req, res) => {
  try {
    const { File_Name, Train_Name } = req.body;

    if (!File_Name || !Train_Name) {
      return res
        .status(400)
        .json({ error: "File_Name and Train_Name are required" });
    }

    const videoKey = `${Train_Name}/${File_Name}`;

    const deleteParams = {
      Bucket: "fitspark44",
      Key: videoKey,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));

    res
      .status(200)
      .json({
        message: `Video ${File_Name} from train ${Train_Name} deleted successfully`,
      });
  } catch (error) {
    console.error("Error deleting coach video:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to delete coach video." });
  }
};
