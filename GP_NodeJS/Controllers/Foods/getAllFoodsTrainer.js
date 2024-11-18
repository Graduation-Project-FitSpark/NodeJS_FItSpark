import db from "../../db.js";

export const getAllFoodsTrainer = (req, res) => {
  const { trainerId } = req.body;

  const query = `
    SELECT ID_Trainer AS idTrainer, 
           ID_Food AS idFood, 
           Day_Of_Week AS dayOfWeek, 
           Times AS time 
    FROM foods_trainer 
    WHERE ID_Trainer = ?`;

  db.query(query, [trainerId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }
    return res.status(200).json(results);
  });
};
