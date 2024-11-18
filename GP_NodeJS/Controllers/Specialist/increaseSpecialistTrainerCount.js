import db from "../../db.js";

export const increaseSpecialistTrainerCount = (req, res) => {
  const { ID_Specialist } = req.body;

  if (!ID_Specialist) {
    return res.status(400).json({ message: "ID_Specialist is required" });
  }

  const query =
    "UPDATE specialist SET Trainers_Count = Trainers_Count + 1 WHERE ID_Specialist = ?";

  db.query(query, [ID_Specialist], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Specialist not found" });
    }

    return res
      .status(200)
      .json({ message: "Trainers_Count incremented successfully" });
  });
};
