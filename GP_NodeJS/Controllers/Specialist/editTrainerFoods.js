import db from "../../db.js";

export const editTrainerFoods = async (req, res) => {
  try {
    const { trainerId, trainerCoachData } = req.body;

    if (!trainerId || !trainerCoachData || trainerCoachData.length === 0) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const deleteQuery = "DELETE FROM foods_trainer WHERE ID_Trainer = ?";
    db.query(deleteQuery, [trainerId], (err) => {
      if (err) {
        return res.status(500).json({ error: "Delete failed" });
      }

      const insertQuery =
        "INSERT INTO foods_trainer (ID_Food, ID_Trainer, Day_Of_Week, Times) VALUES ?";
      const values = trainerCoachData.map((food) => [
        food.ID_Food,
        trainerId,
        food.Day_Of_Week,
        food.Times,
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
