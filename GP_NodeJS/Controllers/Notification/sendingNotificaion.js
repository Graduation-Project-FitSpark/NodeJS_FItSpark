import admin from "firebase-admin";
import serviceAccount from "../../serviceKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendNotification = async (req, res) => {
  const { token, notification, data } = req.body;

  if (!token || !notification) {
    return res
      .status(400)
      .json({ message: "Token and notification payload are required" });
  }

  try {
    const message = {
      token,
      notification,
      data: data || {},
    };

    const response = await admin.messaging().send(message);
    res
      .status(200)
      .json({ message: "Notification sent successfully.", response });
  } catch (error) {
    res.status(500).json({ message: "Failed to send notification.", error });
  }
};
