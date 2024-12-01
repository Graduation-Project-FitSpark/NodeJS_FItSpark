import db from "../../db.js";

export const getCoachDetails = (req, res) => {
  const { username } = req.body;
  const query = "SELECT * FROM coach WHERE Username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: "Coach not found" });
    }
    return res.status(200).json(results[0]);
  });
};
