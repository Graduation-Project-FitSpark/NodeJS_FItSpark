import db from "../../db.js";
import { v4 as uuidv4 } from "uuid";

export const updateCalorieSteps = (req, res) => {
  const { trainerId, steps, calories, distance } = req.body;
  const currentDate = new Date().toISOString().split("T")[0];
  const checkQuery = `
    SELECT * FROM calorie_trainers 
    WHERE ID_Trainer = ? AND Date = ?`;

  db.query(checkQuery, [trainerId, currentDate], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }

    if (results.length > 0) {
      // Case 1: Entry exists
      const existingEntry = results[0];
      const updatedSteps = existingEntry.Steps + steps;
      const updatedCalories = existingEntry.Calories + calories;
      const updatedDistance = existingEntry.Distance + distance;
      const updateQuery = `
      UPDATE calorie_trainers 
      SET Steps = ?, Calories = ?, Distance = ? 
      WHERE ID_Trainer = ? AND Date = ?;
      `;

      db.query(
        updateQuery,
        [
          updatedSteps,
          updatedCalories,
          updatedDistance,
          trainerId,
          currentDate,
        ],
        (err) => {
          if (err) {
            return res.status(500).json({ error: "Update failed" });
          }
          return res
            .status(200)
            .json({ message: "Calories and Steps updated successfully" });
        }
      );
    } else {
      // Case 2: No entry exists for current day
      const newIdCalorie = uuidv4();
      const insertQuery = `
        INSERT INTO calorie_trainers (ID_Calorie, ID_Trainer, Calories, Steps, Day, Date, Distance)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

      const dayOfWeek = new Date().toLocaleDateString("en-US", {
        weekday: "long",
      });

      db.query(
        insertQuery,
        [
          newIdCalorie,
          trainerId,
          calories,
          steps,
          dayOfWeek,
          currentDate,
          distance,
        ],
        (err) => {
          if (err) {
            return res.status(500).json({ error: "Insertion failed" });
          }
          return res.status(201).json({ message: "New calorie entry created" });
        }
      );
    }
  });
};
