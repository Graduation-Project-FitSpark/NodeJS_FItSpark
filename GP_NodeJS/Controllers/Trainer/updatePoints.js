import db from "../../db.js";

export const updatePoints = (req, res) => {
  const { trainerId, pointsToAdd } = req.body;

  if (!trainerId || pointsToAdd === undefined) {
    return res
      .status(400)
      .json({ message: "trainerId and pointsToAdd are required" });
  }

  const query = "UPDATE trainer SET Points = Points + ? WHERE ID_Trainer = ?";

  db.query(query, [pointsToAdd, trainerId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    return res.status(200).json({ message: "Points updated successfully" });
  });
};
