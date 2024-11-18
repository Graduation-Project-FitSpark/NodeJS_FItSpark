import db from "../../db.js";

export const getAllSpecialists = (req, res) => {
  const query = "SELECT * FROM specialist";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No specialists found" });
    }

    return res.status(200).json({ specialists: results });
  });
};
