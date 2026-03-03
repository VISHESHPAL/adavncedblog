import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import roleRouter from "./routes/role.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "",
    credentials: true,
  }),
);


connectDB();

app.use("/api/user", userRoute)
app.use("/api/users", roleRouter)

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`App is Running on the PORT ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("APP IS RUNNING ! ");
});
