import db from "../../db.js";

export const getTrainerWorks = (req, res) => {
  const { trainerId } = req.body;

  if (!trainerId) {
    return res.status(400).json({ error: "Trainer ID is required" });
  }

  const query =
    "SELECT ID_Trains, Day_Of_Week, Steps FROM trains_trainer WHERE ID_Trainer = ?";

  db.query(query, [trainerId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database query failed", details: err.message });
    }

    const groupedByDay = results.reduce((acc, row) => {
      const day = row.Day_Of_Week;
      if (!acc[day]) {
        acc[day] = { ID_Trains: [], Steps: [] };
      }
      acc[day].ID_Trains.push(row.ID_Trains);
      acc[day].Steps.push(row.Steps);
      return acc;
    }, {});

    const response = Object.keys(groupedByDay).map((day) => ({
      ID_Trains: groupedByDay[day].ID_Trains,
      Day_Of_Week: day,
      Steps: groupedByDay[day].Steps,
    }));

    res.status(200).json(response);
  });
};
