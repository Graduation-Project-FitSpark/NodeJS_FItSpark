import db from "../../db.js";

export const insertSpecialistTrainer = (req, res) => {
  const { ID_Trainer, ID_Specialist, Accepted } = req.body;

  if (!ID_Trainer || !ID_Specialist || Accepted === undefined) {
    return res
      .status(400)
      .json({
        message: "ID_Trainer, ID_Specialist, and Accepted are required",
      });
  }

  const query =
    "INSERT INTO trainer_specialist (ID_Trainer, ID_Specialist, Accepted) VALUES (?, ?, ?)";

  db.query(query, [ID_Trainer, ID_Specialist, Accepted], (err, result) => {
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
