import db from "../../db.js";
import nodemailer from "nodemailer";
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
const EditSpecialistsAdmin = async (req, res) => {
  const specialist = req.body;
  const specialists = specialist.map((specialist) => ({
    ...specialist,
    Expression_Date: specialist.Expression_Date.split("T")[0],
    Dateenter: specialist.Dateenter.split("T")[0],
  }));
  try {
    for (const specialist of specialists) {
      const {
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
        YearsOfExperience,
        Dateenter,
        AcceptedDescription,
        Description,
      } = specialist;

      const Img = null;

      if (AcceptedDescription === "R") {
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
          await transporter.sendMail(mailOptions);
          console.log(`Rejection email sent to ${Email}`);

          const deleteQuery = `DELETE FROM specialist WHERE ID_Specialist = ?`;
          await db.promise().query(deleteQuery, [ID_Specialist]);
          console.log(`Specialist with ID ${ID_Specialist} deleted`);
        } catch (error) {
          console.error(`Error sending rejection email to ${Email}:`, error);
          return res
            .status(500)
            .json({ message: `Failed to send rejection email to ${Email}` });
        }
      } else {
        const updateQuery = `UPDATE specialist SET
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
          Img = ?, 
          Dateenter = ?, 
          AcceptedDescription = ?, 
          Description = ? 
          WHERE ID_Specialist = ?`;

        const values = [
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
          Img,
          Dateenter,
          AcceptedDescription,
          Description,
          ID_Specialist,
        ];
        if (AcceptedDescription == "A") {
          sendAcceptedEmail(Email);
        }
        try {
          await db.promise().query(updateQuery, values);
          console.log(`Specialist with ID ${ID_Specialist} updated`);
        } catch (error) {
          console.error(
            `Error updating specialist with ID ${ID_Specialist}:`,
            error
          );
          return res.status(500).json({
            message: `Error updating specialist with ID ${ID_Specialist}`,
          });
        }
      }
    }

    res.status(200).json({ message: "Specialists processed successfully" });
  } catch (error) {
    console.error("Error processing specialists:", error);
    res.status(500).json({ message: "Failed to process specialists" });
  }
};

export default EditSpecialistsAdmin;
