import db from "../../db.js";

export const updateTrainerDetails = (req, res) => {
  const { trainerId, ...updateFields } = req.body;

  if (!trainerId) {
    return res.status(400).json({ message: "trainerId is required" });
  }

  const allowedFields = [
    "Email",
    "Password",
    "First_Name",
    "Last_Name",
    "Phone_Number",
    "Age",
    "Card_Number",
    "Expression_Date",
    "CVC",
  ];

  const updates = Object.keys(updateFields)
    .filter((key) => allowedFields.includes(key))
    .map((key) => `${key} = ?`);

  if (updates.length === 0) {
    return res
      .status(400)
      .json({ message: "No valid fields provided for update" });
  }

  const query = `
    UPDATE trainer
    SET ${updates.join(", ")}
    WHERE ID_Trainer = ?
  `;

  const values = Object.keys(updateFields)
    .filter((key) => allowedFields.includes(key))
    .map((key) => updateFields[key]);

  values.push(trainerId);
  db.query(query, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query failed", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    return res
      .status(200)
      .json({ message: "Trainer details updated successfully" });
  });
};
