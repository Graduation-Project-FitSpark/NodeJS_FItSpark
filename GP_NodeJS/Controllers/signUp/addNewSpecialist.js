import { v4 as uuidv4 } from "uuid";
import db from "../../db.js";

export const signUpSpecialist = (req, res) => {
  const trainersCount = 0;
  console.log("Received Data:", req.body);

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
      message: "Please provide all required specialist details.",
    });
  }

  const specialistId = uuidv4();

  const query = `
    INSERT INTO specialist (
      ID_Specialist,
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
    ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?)
  `;

  const values = [
    specialistId,
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
        .json({ error: "Database error: failed to add specialist." });
    }
    return res.status(200).json({ message: "Specialist successfully added." });
  });
};
