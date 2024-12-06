import db from "../../db.js";

export const processRequestsSpecialist = async (req, res) => {
  const requests = req.body;

  if (!Array.isArray(requests) || requests.length === 0) {
    return res.status(400).json({ error: "Invalid request array" });
  }

  const ID_Specialist = requests[0]?.ID_Specialist;

  if (!ID_Specialist) {
    return res.status(400).json({ error: "ID_Specialist missing" });
  }

  try {
    db.beginTransaction((err) => {
      if (err) {
        console.error("Transaction Error:", err);
        return res.status(500).json({ error: "Transaction failed" });
      }

      const deleteQuery = `DELETE FROM trainer_specialist WHERE ID_Specialist = ?`;
      db.query(deleteQuery, [ID_Specialist], (deleteErr) => {
        if (deleteErr) {
          console.error("Delete Error:", deleteErr);
          return db.rollback(() => {
            res.status(500).json({ error: "Delete failed" });
          });
        }

        const insertQuery = `
          INSERT INTO trainer_specialist (ID_Trainer, ID_Specialist, Accepted, Description)
          VALUES ?
        `;

        const values = requests.map((req) => [
          req.ID_Trainer,
          req.ID_Specialist,
          req.Accepted,
          req.Description,
        ]);

        db.query(insertQuery, [values], (insertErr) => {
          if (insertErr) {
            console.error("Insert Error:", insertErr);
            return db.rollback(() => {
              res.status(500).json({ error: "Insert failed" });
            });
          }

          db.commit((commitErr) => {
            if (commitErr) {
              console.error("Commit Error:", commitErr);
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
    console.error("Catch Error:", error);
    res.status(500).json({ error: "Request failed" });
  }
};
