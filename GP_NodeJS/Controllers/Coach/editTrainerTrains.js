import db from "../../db.js";

export const editTrainerTrains = async (req, res) => {
  try {
    const { trainerId, trineday } = req.body;

    if (!trainerId || !trineday || trineday.length === 0) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const deleteQuery = "DELETE FROM trains_trainer WHERE ID_Trainer = ?";
    db.query(deleteQuery, [trainerId], (err) => {
      if (err) {
        return res.status(500).json({ error: "Delete failed" });
      }

      const insertQuery =
        "INSERT INTO trains_trainer (ID_Trains, ID_Trainer, Day_Of_Week, Steps) VALUES ?";
      const values = trineday.map((train) => [
        train.ID_Trains,
        trainerId,
        train.Day_Of_Week,
        train.Steps,
      ]);

      db.query(insertQuery, [values], (err) => {
        if (err) {
          return res.status(500).json({ error: "Insert failed" });
        }
        res.status(200).json({ message: "Success" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
