import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRout from "./routes/post.js";
import userRout from "./routes/user.js";

const app = express();
dotenv.config();
// Password = "C2eiCP6flI2xdAqM"
// User name =abewatsegaye16

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRout);
app.use("/user", userRout);

const PORT = process.env.PORT;

mongoose
  .connect(
    "mongodb://localhost:27017/test"
    // "mongodb+srv://abewatsegaye16:C2eiCP6flI2xdAqM@cluster0.ttqzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

//mongoose.set("useFindAndModify", false);
