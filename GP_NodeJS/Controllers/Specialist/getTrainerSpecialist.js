import db from "../../db.js";

export const getTrainerSpecialist = (req, res) => {
  const query =
    "SELECT ID_Trainer, ID_Specialist, Accepted FROM trainer_specialist WHERE Accepted = 'A'";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Query failed" });
    res.status(200).json(results);
  });
};
