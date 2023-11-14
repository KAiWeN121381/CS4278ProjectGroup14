import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/users.mjs";

const PORT = 5050;
const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use("/posts", records);

app.use("/users", users);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
