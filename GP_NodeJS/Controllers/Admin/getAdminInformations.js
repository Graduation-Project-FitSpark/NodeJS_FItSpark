import db from "../../db.js";

export const getAdminInformations = (req, res) => {
  const query = "SELECT * FROM admin";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: "Coach not found" });
    }
    return res.status(200).json(results[0]);
  });
};
