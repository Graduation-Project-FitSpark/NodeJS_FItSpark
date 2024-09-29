import nodemailer from "nodemailer";

export const sendVerificationEmail = async (req, res) => {
  const { Email, code } = req.body;

  if (!Email || !code) {
    return res
      .status(400)
      .json({ message: "Email and verification code are required" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false,
    auth: {
      user: "ashayera44@gmail.com",
      pass: "6D22E12F9D0FBB4F674DA73E7C3BE615FAE3",
    },
  });

  const mailOptions = {
    from: "ashayera44@gmail.com",
    to: Email,
    subject: "Your Verification Code To Enter FitSpark",
    text: `Your verification code is: ${code}`,
    html: `<p style="font-size: 24px;"><strong>Your verification code is: ${code}</strong></p>`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return res.status(200).json({ message: "Verification code sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Failed to send verification code." });
  }
};
