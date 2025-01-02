import db from "../../db.js";

export const insertNewMeal = (req, res) => {
  const { foodDetails } = req.body;

  const query = `
    INSERT INTO foods (ID_Food, Food_Name, Details, Img, cal, min, ingredient_idsl)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      foodDetails.ID_Food,
      foodDetails.Food_Name,
      foodDetails.Details,
      foodDetails.Img,
      foodDetails.cal,
      foodDetails.min,
      JSON.stringify(foodDetails.ingredient_idsl),
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Failed to insert new meal" });
      }
      return res.status(200).json({ message: "Meal added successfully" });
    }
  );
};
