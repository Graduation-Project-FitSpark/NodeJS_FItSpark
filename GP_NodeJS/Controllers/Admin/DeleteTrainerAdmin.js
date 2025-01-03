import db from "../../db.js";

export const DeleteTrainerAdmin = (req, res) => {
  const { ID_Trainer } = req.body;

  if (!ID_Trainer) {
    return res.status(400).json({ message: "Trainer ID is required" });
  }

  const query = "DELETE FROM trainer WHERE ID_Trainer = ?";

  db.query(query, [ID_Trainer], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    return res.status(200).json({ message: "Trainer deleted successfully" });
  });
};
