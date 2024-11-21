import db from "../../db.js";

export const insertTrainerToGym = (req, res) => {
  const { trainerId, gym_id } = req.body;

  if (!trainerId || !gym_id) {
    return res.status(400).json({ error: "trainerId and gym_id are required" });
  }

  const query = "INSERT INTO gym_trainer (trainerId, gym_id) VALUES (?, ?)";

  db.query(query, [trainerId, gym_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    return res
      .status(201)
      .json({ message: "Trainer added to gym successfully" });
  });
};
