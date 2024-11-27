import { v4 as uuidv4 } from "uuid";
import db from "../../db.js";

export const signUpCoach = (req, res) => {
  const trainersCount = 0;
  const {
    Username,
    Email,
    Password,
    First_Name,
    Last_Name,
    Phone_Number,
    Age,
    Gender,
    Location,
    Card_Number,
    Expression_Date,
    CVC,
    YearsOfExperience,
    Points,
  } = req.body;
  console.log(YearsOfExperience);
  if (
    !Username ||
    !Email ||
    !Password ||
    !First_Name ||
    !Last_Name ||
    !Phone_Number ||
    !Age ||
    !Gender ||
    !Location ||
    !Card_Number ||
    !Expression_Date ||
    !CVC ||
    !YearsOfExperience
  ) {
    return res.status(400).json({
      message: "Please provide all required coach details.",
    });
  }

  const idCoach = uuidv4();

  const query = `
  INSERT INTO coach (
    ID_Coach,
    Username,
    Email,
    Password,
    First_Name,
    Last_Name,
    Phone_Number,
    Age,
    Gender,
    Location,
    Card_Number,
    Expression_Date,
    CVC,
    Points,
    Trainers_Count,
    YearsOfExperience
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?)
`;

  const values = [
    idCoach,
    Username,
    Email,
    Password,
    First_Name,
    Last_Name,
    Phone_Number,
    Age,
    Gender,
    Location,
    Card_Number,
    Expression_Date,
    CVC,
    YearsOfExperience,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .json({ error: "Database error: failed to add coach." });
    }
    return res.status(201).json({ message: "Coach successfully added." });
  });
};
