import db from "../../db.js";

export const getTrainerLocation = (req, res) => {
  const { trainerId } = req.body;

  if (!trainerId) {
    return res.status(400).json({ error: "trainerId is required" });
  }

  const query = `
      SELECT trainer.location
      FROM trainer
      WHERE trainer.ID_Trainer = ?
    `;

  db.query(query, [trainerId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    const location = results[0].location;

    if (!location || location[0] === null) {
      return res
        .status(404)
        .json({ error: "Location data is missing or invalid" });
    }

    return res.status(200).json({ location });
  });
};
