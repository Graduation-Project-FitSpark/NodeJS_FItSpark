import db from "../../db.js";

export const getAllFoods = (req, res) => {
  const query = `
    SELECT ID_Food AS id, 
           Food_Name AS name, 
           Details AS details, 
           Img AS img, 
           cal, 
           min 
    FROM foods`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Query failed" });
    }
    return res.status(200).json(results);
  });
};
