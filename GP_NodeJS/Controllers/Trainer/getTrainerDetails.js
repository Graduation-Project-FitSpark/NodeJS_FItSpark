import db from "../../db.js";

export const getTrainerDetails = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  const query = "SELECT * FROM trainer WHERE Username = ?";

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const trainer = results[0];
    return res.status(200).json({ trainer });
  });
};
