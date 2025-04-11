import express from "express";
import { checkHealth } from "./controllers/health.mjs";
import questionsRouter from "./routes/questions.mjs";
import answersRouter from "./routes/answers.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/health", checkHealth);

app.use("/questions", questionsRouter);

app.use("/questions/:questionId/answers", answersRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
