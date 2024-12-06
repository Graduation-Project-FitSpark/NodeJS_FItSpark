import db from "../../db.js";

export const getTrainerWeekFoods = (req, res) => {
  const { ID_Trainer } = req.body;
  const query =
    "SELECT ID_Trainer, ID_Food, Day_Of_Week, Times FROM foods_trainer WHERE ID_Trainer = ?";

  db.query(query, [ID_Trainer], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: "No data" });
    }
    return res.status(200).json(results);
  });
};
