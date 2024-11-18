import db from "../../db.js";

export const getTodayCalories = (req, res) => {
  const { trainerId } = req.body;
  const currentDate = new Date().toISOString().split("T")[0];
  const query = `
    SELECT Calories, Steps, Distance 
    FROM calorie_trainers 
    WHERE ID_Trainer = ? AND Date = ?`;

  db.query(query, [trainerId, currentDate], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }
    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ message: "No entry found for today" });
    }
  });
};
