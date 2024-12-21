import db from "../../db.js";

export const DeleteCoachAdmin = (req, res) => {
  const { ID_Coach } = req.body;

  if (!ID_Coach) {
    return res.status(400).json({ message: "Coach ID is required" });
  }

  const query = "DELETE FROM coach WHERE ID_Coach = ?";

  db.query(query, [ID_Coach], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Coach not found" });
    }

    return res.status(200).json({ message: "Coach deleted successfully" });
  });
};
