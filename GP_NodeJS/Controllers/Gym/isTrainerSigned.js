import db from "../../db.js";

export const isTrainerSigned = (req, res) => {
  const { trainerId } = req.body;

  if (!trainerId) {
    return res.status(400).json({ error: "trainerId is required" });
  }

  const query = "SELECT * FROM gym_trainer WHERE trainerId = ?";

  db.query(query, [trainerId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    return res.status(200).json({ isSigned: results.length > 0 });
  });
};
