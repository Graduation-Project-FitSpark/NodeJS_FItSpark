import db from "../../db.js";

export const getTrains = (req, res) => {
  const query = "SELECT * FROM trains";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "query failed" });
    }

    return res.status(200).json({ trains: results });
  });
};
