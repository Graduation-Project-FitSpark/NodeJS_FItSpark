import db from "../../db.js";

export const getAllSales = (req, res) => {
  const query = "SELECT * FROM sales";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Something Wrong!" });
    }
    return res.status(200).json({ sales: results });
  });
};
