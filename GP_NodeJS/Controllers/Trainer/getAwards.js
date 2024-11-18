import db from "../../db.js";

export const getAwards = (req, res) => {
  const query = "SELECT point, photo, name FROM awards";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    return res.status(200).json({ awards: results });
  });
};
