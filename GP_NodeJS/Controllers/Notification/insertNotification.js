import { v4 as uuidv4 } from "uuid";
import db from "../../db.js";

export const insertNotification = (req, res) => {
  const { Description, Date, Msg_To } = req.body;
  const ID_Notification = uuidv4();

  const checkQuery = `
    SELECT COUNT(*) AS count 
    FROM gp.notification 
    WHERE Description = ? AND Msg_To = ?
  `;

  db.query(checkQuery, [Description, Msg_To], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to check for duplicates!" });
    }

    if (result[0].count > 0) {
      return res
        .status(409)
        .json({ message: "Duplicate notification exists!" });
    }

    const insertQuery = `
      INSERT INTO gp.notification 
      (ID_Notification, Description, Date, Msg_To) 
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [ID_Notification, Description, Date, Msg_To],
      (err, result) => {
        if (err) {
          return res.status(200).json({ error: "Failed to insert!" });
        }
        return res.status(201).json({ message: "Notification inserted!" });
      }
    );
  });
};
