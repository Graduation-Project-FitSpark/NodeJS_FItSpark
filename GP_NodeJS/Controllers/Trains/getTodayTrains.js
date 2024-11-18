import db from "../../db.js";

export const getTodayTrains = (req, res) => {
  const { trainerId, dayOfWeek } = req.body;

  const query = `
    SELECT tt.Day_Of_Week, t.Train_Name, t.Description, t.Url_Img 
    FROM trains_trainer tt 
    JOIN trains t ON tt.ID_Trains = t.ID_Trains 
    WHERE tt.ID_Trainer = ? AND tt.Day_Of_Week = ?`;

  db.query(query, [trainerId, dayOfWeek], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No trains found!" });
    }

    return res.status(200).json({ trains: results });
  });
};
