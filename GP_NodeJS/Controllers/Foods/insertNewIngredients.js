import db from "../../db.js";

export const insertNewIngredients = (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "No ingredients provided" });
  }

  const ingredientsDetails = ingredients.map((ingredient) => ({
    ID: ingredient.ID,
    name: ingredient.name,
    img: ingredient.img || "No image available",
  }));

  const checkQuery = `
    SELECT ID FROM ingredients WHERE ID IN (?);
  `;
  const ingredientIds = ingredientsDetails.map((ingredient) => ingredient.ID);

  db.query(checkQuery, [ingredientIds], (err, existingIngredients) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }

    const existingIds = existingIngredients.map((ingredient) => ingredient.ID);

    const newIngredients = ingredientsDetails.filter(
      (ingredient) => !existingIds.includes(ingredient.ID)
    );

    if (newIngredients.length === 0) {
      return res.status(400).json({ error: "All ingredients already exist" });
    }

    const insertQuery = `
      INSERT INTO ingredients (ID, name, img) 
      VALUES ?
    `;

    const insertValues = newIngredients.map((ingredient) => [
      ingredient.ID,
      ingredient.name,
      ingredient.img,
    ]);

    db.query(insertQuery, [insertValues], (err2, results2) => {
      if (err2) {
        return res.status(500).json({ error: "Failed to insert ingredients" });
      }
      return res
        .status(200)
        .json({ message: "Ingredients added successfully" });
    });
  });
};
