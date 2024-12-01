import db from "../../db.js";

export const getTrainerCalorieDetails = async (req, res) => {
  try {
    const query = `
      SELECT 
        ID_Trainer, ID_Calorie, Calories, Steps, Day, Date, Distance
      FROM calorie_trainers
    `;

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }

      const calorieDetails = results.map((record) => ({
        ID_Trainer: record.ID_Trainer,
        ID_Calorie: record.ID_Calorie,
        Calories: record.Calories,
        Steps: record.Steps,
        Day: record.Day,
        Date: record.Date,
        Distance: record.Distance || null,
      }));

      res.status(200).json(calorieDetails);
    });
  } catch (error) {
    console.error("Error retrieving trainer calorie details:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve trainer calorie details" });
  }
};
