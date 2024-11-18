import { v4 as uuidv4 } from "uuid";
import db from "../../db.js";

export const insertNotification = (req, res) => {
  const { ID_User, Type, Description, Date, Msg_From, Msg_To } = req.body;
  const ID_Notification = uuidv4();

  const query = `
    INSERT INTO gp.notification 
    (ID_Notification, ID_User, Type, Description, Date, Msg_From, Msg_To) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [ID_Notification, ID_User, Type, Description, Date, Msg_From, Msg_To],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to insert!" });
      }
      return res.status(201).json({ message: "Notification inserted!" });
    }
  );
};
