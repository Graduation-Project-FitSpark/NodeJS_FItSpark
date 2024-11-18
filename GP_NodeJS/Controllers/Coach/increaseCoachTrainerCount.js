import db from "../../db.js";

export const increaseCoachTrainerCount = (req, res) => {
  const { ID_Coach } = req.body;

  if (!ID_Coach) {
    return res.status(400).json({ message: "ID_Coach is required" });
  }
  const query =
    "UPDATE coach SET Trainers_Count = Trainers_Count + 1 WHERE ID_Coach = ?";

  db.query(query, [ID_Coach], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Coach not found" });
    }

    return res
      .status(200)
      .json({ message: "Trainers_Count incremented successfully" });
  });
};
