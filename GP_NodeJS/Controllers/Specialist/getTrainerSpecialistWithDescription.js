import db from "../../db.js";

export const getTrainerSpecialistWithDescription = async (req, res) => {
  try {
    const query = `
      SELECT 
        ID_Trainer, ID_Specialist, Accepted, Description
      FROM trainer_specialist
    `;

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "query failed" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error retrieving:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve trainer_specialist fields" });
  }
};
