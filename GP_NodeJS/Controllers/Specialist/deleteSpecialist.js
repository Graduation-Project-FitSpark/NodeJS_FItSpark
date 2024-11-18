import db from "../../db.js";

export const deleteSpecialist = (req, res) => {
  const { trainerId } = req.body;

  const query = "DELETE FROM trainer_specialist WHERE ID_Trainer = ?";
  db.query(query, [trainerId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    return res.status(200).json({ message: "Specialist deleted successfully" });
  });
};
