import db from "../../db.js";

export const DeleteSpecialistAdmin = (req, res) => {
  const { ID_Specialist } = req.body;

  if (!ID_Specialist) {
    return res.status(400).json({ message: "Specialist ID is required" });
  }

  const query = "DELETE FROM specialist WHERE ID_Specialist = ?";

  db.query(query, [ID_Specialist], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Specialist not found" });
    }

    return res.status(200).json({ message: "Specialist deleted successfully" });
  });
};
