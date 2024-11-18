import db from "../../db.js";

export const getNotifications = (req, res) => {
  const { Msg_To } = req.body;

  if (!Msg_To) {
    return res.status(400).json({ error: "Msg_To field is required" });
  }

  const query = `
    SELECT * FROM gp.notification 
    WHERE Msg_To = ?
  `;

  db.query(query, [Msg_To], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve!" });
    }
    if (results.length === 0) {
      return res.status(200).json({ notifications: results });
    }
    return res.status(200).json({ notifications: results });
  });
};
