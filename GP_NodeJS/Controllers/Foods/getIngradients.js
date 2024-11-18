import db from "../../db.js";

export const getIngradients = (req, res) => {
  const { foodName } = req.body;

  const foodQuery = `SELECT ingredient_idsl FROM foods WHERE Food_Name = ?`;

  db.query(foodQuery, [foodName], (err, foodResults) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Query failed" });
    }

    if (foodResults.length === 0) {
      console.log("No food found with name:", foodName);
      return res.status(404).json({ message: "Food not found" });
    }

    const ingredientIdString = foodResults[0].ingredient_idsl;

    const ingredientIds = ingredientIdString
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((id) => parseInt(id.trim()));

    if (ingredientIds.length === 0) {
      console.log("No ingredients associated with this food.");
      return res.status(404).json({ message: "No ingredients found" });
    }

    const ingredientQuery = `SELECT ID AS id, name, img AS image FROM ingredients WHERE ID IN (?)`;

    db.query(ingredientQuery, [ingredientIds], (err, ingredientResults) => {
      if (err) {
        console.error("Ingredient query error:", err);
        return res.status(500).json({ error: "Query failed" });
      }

      return res.status(200).json(ingredientResults);
    });
  });
};
