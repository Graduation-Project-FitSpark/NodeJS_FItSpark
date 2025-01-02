import db from "../../db.js";

export const getAllSalesTrainers = async (req, res) => {
  try {
    const query = `
      SELECT ID_Trainer, ID_Sale, Salee_Name, Description, Price, Quantity, Size, Dateenter, Product_Name
      FROM sales
      ORDER BY Dateenter DESC;
    `;

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong!" });
      }

      return res.status(200).json({ sales: results });
    });
  } catch (error) {
    console.error("Error in getAllSalesTrainers:", error);
    return res.status(500).json({ error: "Failed to fetch sales data" });
  }
};
