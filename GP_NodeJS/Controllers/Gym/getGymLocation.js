import db from "../../db.js";

export const getGymLocation = (req, res) => {
  const { trainerId } = req.body;

  if (!trainerId) {
    return res.status(400).json({ error: "trainerId is required" });
  }

  const query = `
    SELECT gym.*
    FROM gym
    JOIN gym_trainer ON gym.gym_id = gym_trainer.gym_id
    WHERE gym_trainer.trainerId = ?
  `;

  db.query(query, [trainerId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Trainer is not associated with any gym" });
    }

    return res.status(200).json(results[0]);
  });
};
