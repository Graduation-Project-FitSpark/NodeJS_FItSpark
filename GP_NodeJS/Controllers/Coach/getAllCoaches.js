import db from "../../db.js";

export const getAllCoaches = (req, res) => {
  const query = "SELECT * FROM coach";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: " query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No coaches found" });
    }

    return res.status(200).json({ coaches: results });
  });
};
