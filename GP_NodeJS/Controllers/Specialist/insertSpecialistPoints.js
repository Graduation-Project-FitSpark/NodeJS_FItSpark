import db from "../../db.js";

export const insertSpecialistPoints = async (req, res) => {
  const { ID_Specialist, Points } = req.body;

  if (!ID_Specialist || Points === undefined) {
    return res
      .status(400)
      .json({ error: "ID_Specialist and Points are required" });
  }

  try {
    db.beginTransaction((err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Transaction initialization failed" });
      }

      const selectQuery = `SELECT Points FROM specialist WHERE ID_Specialist = ?`;

      db.query(selectQuery, [ID_Specialist], (selectErr, results) => {
        if (selectErr) {
          return db.rollback(() => {
            res.status(500).json({ error: "Failed to fetch current points" });
          });
        }

        if (results.length === 0) {
          return db.rollback(() => {
            res.status(404).json({ error: "Specialist not found" });
          });
        }

        const currentPoints = results[0].Points;
        const newPoints = currentPoints + Points;

        const updateQuery = `UPDATE specialist SET Points = ? WHERE ID_Specialist = ?`;

        db.query(updateQuery, [newPoints, ID_Specialist], (updateErr) => {
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
              ID_Specialist,
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
