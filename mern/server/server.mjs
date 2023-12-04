import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/users.mjs";
import https from "https";
import fs from "fs";

const PORT = 5050;
const app = express();

// Use the cors middleware to handle CORS headers
// app.use(
//   cors({
//     origin: "*", // You can replace '*' with the specific origin(s) of your client application
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Enable credentials (if needed)
//     exposedHeaders: "Custom-Header", // Expose additional headers to the client (if needed)
//   })
// );

app.use("/posts", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Expose-Headers", "Custom-Header");
  next();
});

app.use("/users", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Expose-Headers", "Custom-Header");
  next();
});

app.use(express.json());

app.use("/posts", records);

app.use("/users", users);

// start the Express server

let options = {
  key: fs.readFileSync("./privkey.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

server = https.createServer(options, app).listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
