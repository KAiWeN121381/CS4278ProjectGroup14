import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";

const PORT = 5050;
const app = express();

app.use(cors({ origin: 'http://52.15.93.98' }));

app.use(express.json());

app.use("/posts", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
