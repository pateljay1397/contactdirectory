import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
const PORT = 8080;
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import routes from "./routes/routes.js";

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use("/api", routes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
