import db from "../../db.js";

export const getTrainerCoachWithDescription = async (req, res) => {
  try {
    const query = `
      SELECT 
        ID_Trainer, ID_Coach, Accepted, Description
      FROM trainer_coach
    `;

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "query failed" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error retrieving:", error);
    res.status(500).json({ error: "Failed to retrieve trainer_coach fields" });
  }
};
