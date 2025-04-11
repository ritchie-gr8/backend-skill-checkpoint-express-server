import express from "express";
import { checkHealth } from "./controllers/health.mjs";
import questionsRouter from "./routes/questions.mjs";
import answersRouter from "./routes/answers.mjs";
import voteRouter from "./routes/vote.mjs";
import { validateAnswerExists } from "./middlewares/answers.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/health", checkHealth);

app.use("/questions", questionsRouter);
app.use("/questions/:questionId/answers", answersRouter);
app.use("/answers/:answerId/vote", validateAnswerExists, voteRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
