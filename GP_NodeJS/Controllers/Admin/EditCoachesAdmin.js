import nodemailer from "nodemailer";
import db from "../../db.js";

const sendRejectionEmail = async (Email) => {
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
    subject: "Rejection Notification from FitSpark",
    text: `We are sorry to inform you that your request has been rejected. If you have any questions, please contact support.`,
    html: `<p style="font-size: 24px;"><strong>We are sorry to inform you that your request has been rejected. If you have any questions, please contact support.</strong></p>`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending rejection email:", error);
  }
};
const sendAcceptedEmail = async (Email) => {
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
    subject: "Notification from FitSpark",
    text: `We are approved your request, feel free in our site and welcome to our family! If you have any questions, please contact support.`,
    html: `<p style="font-size: 24px;"><strong>We are approved your request, feel free in our site and welcome to our family! If you have any questions, please contact support.</strong></p>`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending rejection email:", error);
  }
};
const EditCoachsAdmin = async (req, res) => {
  const coach = req.body;
  const coaches = coach.map((coach) => ({
    ...coach,
    Expression_Date: coach.Expression_Date.split("T")[0],
    Dateenter: coach.Dateenter.split("T")[0],
  }));

  if (!coaches || coaches.length === 0) {
    return res.status(400).json({ message: "No coaches provided for update" });
  }

  try {
    for (let coach of coaches) {
      const {
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
        YearsOfExperience,
        AcceptedDescription,
        Description,
        Dateenter,
      } = coach;

      if (AcceptedDescription === "R") {
        sendRejectionEmail(Email);
        const deleteQuery = `DELETE FROM coach WHERE ID_Coach = ?`;

        db.query(deleteQuery, [ID_Coach], (err, result) => {
          if (err) {
            console.error(`Error deleting coach with ID ${ID_Coach}:`, err);
            return res.status(500).json({ message: "Error deleting coach" });
          }
          console.log(`Coach with ID ${ID_Coach} deleted successfully.`);
        });
      } else {
        const updateQuery = `
          UPDATE coach
          SET 
            Username = ?, 
            Email = ?, 
            Password = ?, 
            First_Name = ?, 
            Last_Name = ?, 
            Phone_Number = ?, 
            Age = ?, 
            Gender = ?, 
            Location = ?, 
            Card_Number = ?, 
            Expression_Date = ?, 
            CVC = ?, 
            Points = ?, 
            Trainers_Count = ?, 
            YearsOfExperience = ?, 
            Img = NULL, 
            Dateenter = ?, 
            AcceptedDescription = ?, 
            Description = ?
          WHERE ID_Coach = ?;
        `;
        if (AcceptedDescription == "A") {
          sendAcceptedEmail(Email);
        }
        db.query(
          updateQuery,
          [
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
            YearsOfExperience,
            Dateenter,
            AcceptedDescription,
            Description,
            ID_Coach,
          ],
          (err, result) => {
            if (err) {
              console.error(
                `Error updating coach with the ID ${ID_Coach}:`,
                err
              );
              return res.status(500).json({ message: "Error updating coach" });
            }
            console.log(`Coach with ID ${ID_Coach} updated successfully.`);
          }
        );
      }
    }

    res.status(200).json({ message: "Coaches updated successfully" });
  } catch (error) {
    console.error("Error updates:", error);
    res.status(500).json({ message: "Error processing coach" });
  }
};

export default EditCoachsAdmin;
