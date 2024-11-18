import db from "../../db.js";

export const getPoints = (req, res) => {
  const { trainerId } = req.body;

  if (!trainerId) {
    return res.status(400).json({ message: "trainerId is required" });
  }

  const query = "SELECT Points FROM trainer WHERE ID_Trainer = ?";

  db.query(query, [trainerId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    return res.status(200).json({ points: results[0].Points });
  });
};
