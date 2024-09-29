import db from "../../db.js";

export const ifUserExsists = (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  const queries = {
    trainer: "SELECT * FROM trainer WHERE Username = ?",
    coach: "SELECT * FROM coach WHERE Username = ?",
    specialist: "SELECT * FROM specialist WHERE Username = ?",
  };

  const searchTable = (table, callback) => {
    db.query(queries[table], [username], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: `Database query failed in ${table} table` });
      }
      if (results.length > 0) {
        return res.status(200).json({ message: `T` });
      }
      callback();
    });
  };

  searchTable("trainer", () => {
    searchTable("coach", () => {
      searchTable("specialist", () => {
        return res.status(404).json({ message: `F` });
      });
    });
  });
};
