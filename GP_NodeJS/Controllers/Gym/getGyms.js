import db from "../../db.js";

export const getGyms = (req, res) => {
  const query = "SELECT * FROM gym";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    const modifiedResults = results.map((gym) => {
      const location = JSON.parse(gym.location);
      return {
        ...gym,
        latitude: location[0],
        longitude: location[1],
      };
    });

    return res.status(200).json(modifiedResults);
  });
};
