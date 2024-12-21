import db from "../../db.js";

export const searchForUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const queries = {
    trainer: "SELECT * FROM trainer WHERE Username = ?",
    coach: "SELECT * FROM coach WHERE Username = ?",
    specialist: "SELECT * FROM specialist WHERE Username = ?",
    admin: "SELECT * FROM admin WHERE Username = ?",
  };

  const searchTable = (table, callback) => {
    db.query(queries[table], [username], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: `Database query failed in ${table} table` });
      }
      if (results.length > 0) {
        const user = results[0];
        if (user.Password === password) {
          return res
            .status(200)
            .json({ message: `${table} authenticated`, user, table: table });
        } else {
          return res.status(401).json({ message: "Invalid password" });
        }
      }
      callback();
    });
  };

  searchTable("trainer", () => {
    searchTable("coach", () => {
      searchTable("specialist", () => {
        searchTable("admin", () => {
          return res.status(404).json({ message: "User not found" });
        });
      });
    });
  });
};
