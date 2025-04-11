import express from "express";
import { checkHealth } from "./controllers/health.mjs";
import questionsRouter from "./routes/questions.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/health", checkHealth);

app.use("/questions", questionsRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
