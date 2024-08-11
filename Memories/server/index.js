import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRout from "./routes/post.js";

const app = express();
// Password = "C2eiCP6flI2xdAqM"
// User name =abewatsegaye16

app.use("/posts", postRout);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_ULR =
  "mongodb+srv://abewatsegaye16:C2eiCP6flI2xdAqM@cluster0.ttqzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = 5000;

mongoose
  .connect(CONNECTION_ULR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

//mongoose.set("useFindAndModify", false);
