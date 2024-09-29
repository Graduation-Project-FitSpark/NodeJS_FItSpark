import db from "../../db.js";

export const searchForSpecialist = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const query = "SELECT * FROM specialist WHERE Username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Specialist not found" });
    }

    const specialist = results[0];

    if (specialist.Password === password) {
      return res
        .status(200)
        .json({ message: "Specialist authenticated", specialist });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  });
};
