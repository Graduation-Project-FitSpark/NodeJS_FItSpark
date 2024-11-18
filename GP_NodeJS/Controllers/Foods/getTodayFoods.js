import db from "../../db.js";

export const getTodayFoods = (req, res) => {
  const { trainerId, dayOfWeek } = req.body;
  const query = `
    SELECT ft.Day_Of_Week, ft.Times, f.Food_Name, f.Details, f.Img 
    FROM foods_trainer ft 
    JOIN foods f ON ft.ID_Food = f.ID_Food 
    WHERE ft.ID_Trainer = ? AND ft.Day_Of_Week = ?`;

  db.query(query, [trainerId, dayOfWeek], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No foods found!" });
    }

    return res.status(200).json({ foods: results });
  });
};
