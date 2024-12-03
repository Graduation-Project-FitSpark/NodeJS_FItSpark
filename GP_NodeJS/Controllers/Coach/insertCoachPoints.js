import db from "../../db.js";

export const insertCoachPoints = async (req, res) => {
  const { ID_Coach, Points } = req.body;

  if (!ID_Coach || Points === undefined) {
    return res.status(400).json({ error: "ID_Coach and Points are required" });
  }

  try {
    db.beginTransaction((err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Transaction initialization failed" });
      }

      const selectQuery = `SELECT Points FROM coach WHERE ID_Coach = ?`;

      db.query(selectQuery, [ID_Coach], (selectErr, results) => {
        if (selectErr) {
          return db.rollback(() => {
            res.status(500).json({ error: "Failed to fetch current points" });
          });
        }

        if (results.length === 0) {
          return db.rollback(() => {
            res.status(404).json({ error: "Coach not found" });
          });
        }

        const currentPoints = results[0].Points;
        const newPoints = currentPoints + Points;

        const updateQuery = `UPDATE Coach SET Points = ? WHERE ID_Coach = ?`;

        db.query(updateQuery, [newPoints, ID_Coach], (updateErr) => {
          if (updateErr) {
            return db.rollback(() => {
              res.status(500).json({ error: "Failed to update points" });
            });
          }

          db.commit((commitErr) => {
            if (commitErr) {
              return db.rollback(() => {
                res.status(500).json({ error: "Commit failed" });
              });
            }

            res.status(200).json({
              message: "Points updated successfully",
              ID_Coach,
              newPoints,
            });
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Request failed" });
  }
};
