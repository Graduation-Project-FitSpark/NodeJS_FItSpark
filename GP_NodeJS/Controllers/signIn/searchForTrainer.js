import db from "../../db.js";

export const searchForTrainer = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
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

    if (trainer.Password === password) {
      return res
        .status(200)
        .json({ message: "Trainer authenticated", trainer });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  });
};
