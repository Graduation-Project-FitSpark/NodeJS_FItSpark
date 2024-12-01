import db from "../../db.js";

export const getTrainerCoach = (req, res) => {
  const query =
    "SELECT ID_Trainer, ID_Coach, Accepted FROM trainer_coach WHERE Accepted = 'A'";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Query failed" });
    res.status(200).json(results);
  });
};
