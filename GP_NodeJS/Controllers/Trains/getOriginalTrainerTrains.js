import db from "../../db.js";

export const getOriginalTrainerTrains = (req, res) => {
  const { trainerId } = req.body;

  if (!trainerId) {
    return res.status(400).json({ error: "Trainer ID required" });
  }

  const query =
    "SELECT ID_Trains, Day_Of_Week, Steps FROM trains_trainer WHERE ID_Trainer = ?";

  db.query(query, [trainerId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Query failed", details: err.message });
    }

    const response = results
      .map((row) => {
        const idTrains = row.ID_Trains.split(",");
        return idTrains.map((id) => ({
          ID_Trains: id.trim(),
          Day_Of_Week: row.Day_Of_Week,
          Steps: row.Steps,
        }));
      })
      .flat();

    res.status(200).json(response);
  });
};
