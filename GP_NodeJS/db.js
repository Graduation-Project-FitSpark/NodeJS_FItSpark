import mysql from "mysql2";
const db = mysql.createConnection({
  host: "localhost",
  port: 5000,
  user: "root",
  password: "ahmadAAA123AAA321",
  database: "gp",
});

db.connect((err) => {
  if (err) {
    console.error("Connection failed:", err);
  } else {
    console.log("MySQL Connected ");
  }
});
export default db;
