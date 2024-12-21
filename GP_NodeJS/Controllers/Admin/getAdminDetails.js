import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
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

const getAdminDetails = async (req, res) => {
  try {
    const query = `SELECT * FROM admin LIMIT 1`;
    db.query(query, async (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      if (results.length === 0)
        return res.status(404).json({ error: "Admin not found" });

      const adminData = results[0];
      const username = adminData.Username;
      const bucketName = "fitspark44";
      const key = `${username}`;
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      try {
        const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        adminData.img = imageUrl;
      } catch (error) {
        adminData.img = null;
      }

      return res.status(200).json(adminData);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve admin details" });
  }
};

export default getAdminDetails;
