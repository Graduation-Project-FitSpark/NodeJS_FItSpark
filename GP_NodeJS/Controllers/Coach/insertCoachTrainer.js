import db from "../../db.js";

export const insertCoachTrainer = (req, res) => {
  const { ID_Trainer, ID_Coach, Accepted } = req.body;

  if (!ID_Trainer || !ID_Coach || Accepted === undefined) {
    return res
      .status(400)
      .json({ message: "ID_Trainer, ID_Coach, and Accepted are required" });
  }

  const query =
    "INSERT INTO trainer_coach (ID_Trainer, ID_Coach, Accepted) VALUES (?, ?, ?)";

  db.query(query, [ID_Trainer, ID_Coach, Accepted], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    return res
      .status(200)
      .json({
        message: "Data inserted successfully",
        insertId: result.insertId,
      });
  });
};
