import db from "../../db.js";

export const uploadToken = (req, res) => {
  const { token, type, username } = req.body;

  if (!token || !type || !username) {
    return res
      .status(400)
      .json({ error: "Token, type, and username are required" });
  }

  const lowerCaseType = type.toLowerCase();
  const table = `${lowerCaseType}`;
  const query = `
    UPDATE ${table} 
    SET token = ? 
    WHERE Username = ?
  `;

  db.query(query, [token, username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update" });
    }
    return res.status(200).json({ message: "Updated successfully" });
  });
};
