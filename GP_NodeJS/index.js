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
import sendMessageToOpenAIRouter from "./Routes/Quiz/openAiRouter.js";
import getTrinerDetailsRouter from "./Routes/Trainer/getTrainerDetailsRouter.js";
import getFoodsRouter from "./Routes/Foods/getFoodsRouter.js";
import getTrainsRouter from "./Routes/Trains/getTrainsRouter.js";
import storeResultsRouter from "./Routes/Quiz/storeResultRouter.js";
import getAllCoachesRouter from "./Routes/Coach/getAllCoachesRouter.js";
import getAllSpecialistsRouter from "./Routes/Specialist/getAllSpecialistRouter.js";
import insertCoachTrainerRouter from "./Routes/Coach/insertCoachTrainerRouter.js";
import insertSpecialistTrainerRouter from "./Routes/Specialist/insertSpecialistTrainerRouter.js";
import increaseCoachTrainerCountRouter from "./Routes/Coach/increaseTrainerRouter.js";
import increaseSpecialistTrainerCountRouter from "./Routes/Specialist/increaseSpecialistTrainerCountRouter.js";
import insertNotificationRouter from "./Routes/Notification/insertNotificationRouter.js";
import getNotificationsRouter from "./Routes/Notification/getNotificationsRouter.js";
import getTodayFoodsRouter from "./Routes/Foods/getTodayFoodsRouter.js";
import getTodayTrainsRouter from "./Routes/Trains/getTodayTrainsRouter.js";
import updateCaorieStepsRouter from "./Routes/Calories/updateCalorieStepsRouter.js";
import gettingVideosRouter from "./Routes/Aws/gettingVideosRouter.js";
import uploadProfileImgRouter from "./Routes/Aws/uploadProfileImgRouter.js";
import getProfileImageRouter from "./Routes/Aws/getProfileImageRouter.js";
import ifUserResultExsistsRouter from "./Routes/Quiz/isUserResultExsistsRouter.js";
import getTodayCaloriesRouter from "./Routes/Calories/getTodayCaloriesRouter.js";
import getWorksRouter from "./Routes/Trains/getWorksRouter.js";
import getTrainerWorksRouter from "./Routes/Trains/getTrainerWorksRouter.js";
import getAllFoodsRouter from "./Routes/Foods/getAllFoodsRouter.js";
import getAllFoodsTrainerRouter from "./Routes/Foods/getAllFoodsTrainerRouter.js";
import getIngradientsRouter from "./Routes/Foods/getIngradientsRouter.js";
import updatePointsRouter from "./Routes/Trainer/updatePointsRouter.js";
import getPointsRouter from "./Routes/Trainer/getPointsRouter.js";
import getAwardsRouter from "./Routes/Trainer/getAwardsRouter.js";
import updateTrainerDetailsRouter from "./Routes/Trainer/updateTrainerDetailsRouter.js";
import updateWatchedRouter from "./Routes/Trainer/updateWatchedRouter.js";
import checkCoachResponseRouter from "./Routes/Coach/checkCoachResponseRouter.js";
import checkSpecialistResponseRouter from "./Routes/Specialist/checkSpecialistResponseRouter.js";
import deleteCoachRouter from "./Routes/Coach/deleteCoachRouter.js";
import deleteSpecialistRouter from "./Routes/Specialist/deleteSpecialistRouter.js";
import getGymLocationRouter from "./Routes/Gym/getGymLocationRouter.js";
import insertTrainerToGymRouter from "./Routes/Gym/insertTrainerToGymRouter.js";
import isTrainerSignedRouter from "./Routes/Gym/isTrainerSignedRouter.js";
import getGymsRouter from "./Routes/Gym/getGymsRouter.js";
import getTrainerLocationRouter from "./Routes/Gym/getTrainerLocationRouter.js";
import sendingNotificationRouter from "./Routes/Notification/sendingNotificationRouter.js";
import uploadTokenRouter from "./Routes/Notification/uploadTokenRouter.js";
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
app.use("/uploadToken", uploadTokenRouter);
app.use("/sendingNotification", sendingNotificationRouter);
app.use("/getTrainerLocation", getTrainerLocationRouter);
app.use("/getGyms", getGymsRouter);
app.use("/isTrainerSigned", isTrainerSignedRouter);
app.use("/insertTrainerToGym", insertTrainerToGymRouter);
app.use("/getGymLocation", getGymLocationRouter);
app.use("/deleteCoach", deleteCoachRouter);
app.use("/deleteSpecialist", deleteSpecialistRouter);
app.use("/checkSpecialistResponse", checkSpecialistResponseRouter);
app.use("/checkCoachResponse", checkCoachResponseRouter);
app.use("/updateWatched", updateWatchedRouter);
app.use("/updateTrainerDetails", updateTrainerDetailsRouter);
app.use("/getAwards", getAwardsRouter);
app.use("/getPoints", getPointsRouter);
app.use("/updatePoints", updatePointsRouter);
app.use("/getIngradients", getIngradientsRouter);
app.use("/getAllFoodsTrainer", getAllFoodsTrainerRouter);
app.use("/getAllFoods", getAllFoodsRouter);
app.use("/getTrainerWorks", getTrainerWorksRouter);
app.use("/getWorks", getWorksRouter);
app.use("/getTodayCalories", getTodayCaloriesRouter);
app.use("/ifUserResultExsists", ifUserResultExsistsRouter);
app.use("/getProfileImage", getProfileImageRouter);
app.use("/uploadProfileImgRouter", uploadProfileImgRouter);
app.use("/gettingVideos", gettingVideosRouter);
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
app.use("/sendQuizResult", sendMessageToOpenAIRouter);
app.use("/getTrainerDetails", getTrinerDetailsRouter);
app.use("/getFoods", getFoodsRouter);
app.use("/getTrains", getTrainsRouter);
app.use("/sendingFinalResponse", storeResultsRouter);
app.use("/getAllCoaches", getAllCoachesRouter);
app.use("/getAllSpecialists", getAllSpecialistsRouter);
app.use("/insertCoachTrainer", insertCoachTrainerRouter);
app.use("/insertSpecialistTrainer", insertSpecialistTrainerRouter);
app.use("/increaseCoachTrainerCount", increaseCoachTrainerCountRouter);
app.use(
  "/increaseSpecialistTrainerCount",
  increaseSpecialistTrainerCountRouter
);
app.use("/insertNotification", insertNotificationRouter);
app.use("/getNotifications", getNotificationsRouter);
app.use("/getTodayFoods", getTodayFoodsRouter);
app.use("/getTodayTrains", getTodayTrainsRouter);
app.use("/updateCalorieSteps", updateCaorieStepsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
