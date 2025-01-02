import db from "../../db.js";
import { S3 } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIAUQ4L23NPOOMKCSM3",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
});

const uploadImageToS3 = async (fileName, imageBase64) => {
  const bucketName = "fitspark44";
  const key = `Shop/${fileName}.jpg`;
  const buffer = Buffer.from(imageBase64, "base64");

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: "image/jpeg",
  };

  await s3.putObject(params);
  return `https://${bucketName}.s3.${s3.config.region}.amazonaws.com/${key}`;
};

export const insertNewProduct = async (req, res) => {
  try {
    const {
      Salee_Name,
      Price,
      Quantity,
      Description,
      Product_Name,
      Size,
      Img,
    } = req.body;

    if (!Salee_Name || !Price || !Quantity || !Product_Name) {
      return res.status(400).json({ error: "Missing required fields!" });
    }

    const ID_Sale = uuidv4();

    let imageUrl = null;
    Img
      ? await uploadImageToS3(Product_Name, Img)
      : `https://${s3.config.region}.amazonaws.com/fitspark44/Shop/default.jpg`;

    const query =
      "INSERT INTO shop (ID_Sale, Salee_Name, Price, Quantity, Description, Product_Name, Size, Img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      ID_Sale,
      Salee_Name,
      Price,
      Quantity,
      Description,
      Product_Name,
      Size,
      imageUrl,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting new product:", err);
        return res.status(500).json({ error: "Failed to insert product!" });
      }

      return res.status(200).json({
        message: "Product added successfully!",
        productId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error in insertNewProduct:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the product." });
  }
};
