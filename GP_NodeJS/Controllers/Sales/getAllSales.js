import db from "../../db.js";
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

const getImageUrl = async (fileName) => {
  const bucketName = "fitspark44";
  const key = `Shop/${fileName}.jpg`;

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

const getDefaultImageUrl = async () => {
  const bucketName = "fitspark44";
  const key = "Shop/default.jpg";

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

export const getAllSales = async (req, res) => {
  try {
    const query = "SELECT * FROM shop";
    db.query(query, async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong!" });
      }

      const defaultImageUrl = await getDefaultImageUrl();

      const updatedResults = await Promise.all(
        results.map(async (sale) => {
          if (sale.Img) {
            return { ...sale };
          } else {
            try {
              const dynamicImageUrl = await getImageUrl(sale.Product_Name);
              return { ...sale, Img: dynamicImageUrl };
            } catch (err) {
              console.error(
                `Error generating URL for ${sale.Product_Name}:`,
                err
              );
              return { ...sale, Img: defaultImageUrl };
            }
          }
        })
      );

      return res.status(200).json({ sales: updatedResults });
    });
  } catch (error) {
    console.error("Error in getAllSales:", error);
    return res.status(500).json({ error: "Failed to fetch sales data" });
  }
};
