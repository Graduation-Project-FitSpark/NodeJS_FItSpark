import db from "../../db.js";

export const updateWatched = (req, res) => {
  const { trainerId } = req.body;

  if (!trainerId) {
    return res.status(400).json({ message: "trainerId is required" });
  }

  const query =
    "UPDATE trainer SET WatchedVideos = WatchedVideos + 1 WHERE ID_Trainer = ?";

  db.query(query, [trainerId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    return res
      .status(200)
      .json({ message: "Watched videos updated successfully" });
  });
};
