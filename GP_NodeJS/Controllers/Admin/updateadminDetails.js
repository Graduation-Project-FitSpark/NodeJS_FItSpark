import db from "../../db.js";

export const updateadminDetails = (req, res) => {
  const { ...updateFields } = req.body;

  const allowedFields = [
    "Email",
    "Password",
    "First_Name",
    "Last_Name",
    "Phone_Number",
    "Age",
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
    UPDATE admin
    SET ${updates.join(", ")}
  `;

  const values = Object.keys(updateFields)
    .filter((key) => allowedFields.includes(key))
    .map((key) => updateFields[key]);

  db.query(query, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query failed", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "admin not found" });
    }

    return res
      .status(200)
      .json({ message: "admin details updated successfully" });
  });
};
