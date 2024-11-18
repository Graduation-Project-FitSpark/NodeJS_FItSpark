import db from "../../db.js";

export const isUserResultExists = (req, res) => {
  const { ID_Trainer } = req.body;

  if (!ID_Trainer) {
    return res.status(400).json({ message: "ID_Trainer is required" });
  }

  const query = `
    SELECT 1 FROM foods_trainer WHERE ID_Trainer = ?
    UNION
    SELECT 1 FROM trains_trainer WHERE ID_Trainer = ?
    LIMIT 1
  `;

  db.query(query, [ID_Trainer, ID_Trainer], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length > 0) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  });
};
