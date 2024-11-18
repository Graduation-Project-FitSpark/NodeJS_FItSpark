import db from "../../db.js";

const storeResults = async (req, res) => {
  console.log("Received Request Data:", req.body);

  const { trainerId, response } = req.body;

  const parsedResponse = JSON.parse(
    response.response.replace(/```json\n/, "").replace(/```/, "")
  );
  const { Foods, Trains } = parsedResponse;

  if (!Foods || !Trains) {
    console.error("Invalid response structure:", parsedResponse);
    return res
      .status(400)
      .json({ success: false, message: "Invalid response structure." });
  }

  const foodEntries = Object.entries(Foods).flatMap(([day, foods]) =>
    foods.map((food) => ({
      ID_Trainer: trainerId,
      ID_Food: food.ID,
      Day_Of_Week: day,
      Time: food.Time,
    }))
  );

  const trainEntries = Object.entries(Trains).flatMap(([day, trains]) =>
    trains.map((train) => ({
      ID_Trainer: trainerId,
      ID_Train: train.ID_Train,
      Day_Of_Week: day,
    }))
  );

  console.log("Train Entries:", trainEntries);

  try {
    for (const entry of foodEntries) {
      db.query(
        "INSERT INTO foods_trainer (ID_Trainer, ID_Food, Day_Of_Week, Times) VALUES (?, ?, ?, ?)",
        [entry.ID_Trainer, entry.ID_Food, entry.Day_Of_Week, entry.Time]
      );
    }

    for (const entry of trainEntries) {
      db.query(
        "INSERT INTO trains_trainer (ID_Trains,ID_Trainer,Day_Of_Week) VALUES (?, ?, ?)",
        [entry.ID_Train, entry.ID_Trainer, entry.Day_Of_Week]
      );
    }

    return res
      .status(200)
      .json({ success: true, message: "Results stored successfully." });
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default storeResults;
