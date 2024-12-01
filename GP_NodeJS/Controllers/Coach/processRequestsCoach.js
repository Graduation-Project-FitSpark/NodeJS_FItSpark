import db from "../../db.js";

export const processRequestsCoach = async (req, res) => {
  const requests = req.body;

  if (!Array.isArray(requests) || requests.length === 0) {
    return res.status(400).json({ error: "Invalid request array" });
  }

  const ID_Coach = requests[0]?.ID_Coach;

  if (!ID_Coach) {
    return res.status(400).json({ error: "Coach ID missing" });
  }

  try {
    db.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ error: "Transaction failed" });
      }

      const deleteQuery = `DELETE FROM trainer_coach WHERE ID_Coach = ?`;

      db.query(deleteQuery, [ID_Coach], (deleteErr) => {
        if (deleteErr) {
          return db.rollback(() => {
            res.status(500).json({ error: "Delete failed" });
          });
        }

        const insertQuery = `
          INSERT INTO trainer_coach (ID_Trainer, ID_Coach, Accepted, Description)
          VALUES ?
        `;

        const values = requests.map((req) => [
          req.ID_Trainer,
          req.ID_Coach,
          req.Accepted,
          req.Description,
        ]);

        db.query(insertQuery, [values], (insertErr) => {
          if (insertErr) {
            return db.rollback(() => {
              res.status(500).json({ error: "Insert failed" });
            });
          }

          db.commit((commitErr) => {
            if (commitErr) {
              return db.rollback(() => {
                res.status(500).json({ error: "Commit failed" });
              });
            }

            res.status(200).json({ message: "Success" });
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Request failed" });
  }
};
