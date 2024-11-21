import db from "../../db.js";

export const checkSpecialistResponse = (req, res) => {
  const { trainerId } = req.body;
  const query = "SELECT Accepted FROM trainer_specialist WHERE ID_Trainer = ?";
  db.query(query, [trainerId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: "Trainer not found" });
    }

    return res.status(200).json({ Accepted: results[0].Accepted });
  });
};
