import { v4 as uuidv4 } from "uuid"; 
import db from "../../db.js";

export const signUpTrainer = (req, res) => {
  const {
    Username,
    Email,
    Password,
    First_Name,
    Last_Name,
    Phone_Number,
    Age,
    Weight,
    Hight,
    Gender,
    Class_Type,
    Location,
    Activity_Level,
    Card_Number,
    Expression_Date,
    CVC,
    Image,
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
    !Weight ||
    !Hight ||
    !Gender ||
    !Class_Type ||
    !Location ||
    !Activity_Level ||
    !Card_Number ||
    !Expression_Date ||
    !CVC ||
    !Image
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const trainerId = uuidv4();

  const query = `
    INSERT INTO trainer (
      ID_Trainer,
      Username,
      Email,
      Password,
      First_Name,
      Last_Name,
      Phone_Number,
      Age,
      Weight,
      Hight,
      Gender,
      Class_Type,
      Location,
      Activity_Level,
      Card_Number,
      Expression_Date,
      CVC,
      Points,
      Image,
      WatchedVideos
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `;

  const values = [
    trainerId, 
    Username,
    Email,
    Password,
    First_Name,
    Last_Name,
    Phone_Number,
    Age,
    Weight,
    Hight,
    Gender,
    Class_Type,
    Location,
    Activity_Level,
    Card_Number,
    Expression_Date,
    CVC,
    Points,
    Image,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err); 
      return res
        .status(500)
        .json({ error: "Database error: failed to add trainer" });
    }
    return res.status(201).json({ message: "Trainer successfully added" });
  });
};
