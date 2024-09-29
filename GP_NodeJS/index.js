import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; 
import searchForTrainersRouter from "./Routes/signIn/searchForTrainerRouter.js";
import searchForSpecialistRouter from "./Routes/signIn/searchForSpecialistRouter.js";
import getAllSalesRouter from "./Routes/Sales/getAllSales.js";
import searchForCoachRouter from "./Routes/signIn/searchForCoachRouter.js";
import searchForUserRouter from "./Routes/signIn/searchForUserRouter.js";
import signUpTrainerRouter from "./Routes/signUp/addNewTrainerRouter.js";
import signUpCoachRouter from "./Routes/signUp/addNewCoachRouter.js";
import signUpSpecialistRouter from "./Routes/signUp/addNewSpecialistRouter.js";
import AuthenticationRouter from "./Routes/signIn/authenticationRouter.js";
import ifUserExsistsRouter from "./Routes/signUp/ifUserExsistsRouter.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3001", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
  })
);

app.use(bodyParser.json());

app.use("/searchForTrainer", searchForTrainersRouter);
app.use("/getAllSales", getAllSalesRouter);
app.use("/searchForSpecialist", searchForSpecialistRouter);
app.use("/searchForCoach", searchForCoachRouter);
app.use("/signUpTrainer", signUpTrainerRouter);
app.use("/signUpCoach", signUpCoachRouter);
app.use("/signUpSpecialist", signUpSpecialistRouter);
app.use("/searchForUser", searchForUserRouter);
app.use("/auth", AuthenticationRouter);
app.use("/ifUserExsistsRouter", ifUserExsistsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
