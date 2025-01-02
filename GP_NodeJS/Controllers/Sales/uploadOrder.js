import db from "../../db.js";

export const uploadOrder = (req, res) => {
  const { Items, ID_Trainer } = req.body;
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updatedItems = Items.map((item) => ({
    ...item,
    ID_Trainer,
    Dateenter: currentDate,
  }));

  const queryInsert = `INSERT INTO sales (ID_Trainer, ID_Sale, Salee_Name, Description, Price, Quantity, Size, Dateenter, Product_Name) VALUES ?`;

  const values = updatedItems.map((item) => [
    item.ID_Trainer,
    item.ID_Sale,
    item.Salee_Name,
    item.Description,
    item.Price,
    item.Quantity,
    item.Size,
    item.Dateenter,
    item.Product_Name,
  ]);

  db.query(queryInsert, [values], (err, result) => {
    if (err) {
      console.error("Error inserting data into sales table:", err);
      return res.status(500).json({ error: "Something went wrong!" });
    }

    updatedItems.forEach((item) => {
      const queryUpdate = `UPDATE shop SET Quantity = Quantity - ? WHERE ID_Sale = ?`;

      db.query(
        queryUpdate,
        [item.Quantity, item.ID_Sale],
        (errUpdate, resultUpdate) => {
          if (errUpdate) {
            console.error("Error updating Quantity in shop table:", errUpdate);
            return res
              .status(500)
              .json({ error: "Something went wrong while updating stock!" });
          }
        }
      );
    });

    return res
      .status(200)
      .json({ message: "Orders uploaded and stock updated successfully!" });
  });
};
