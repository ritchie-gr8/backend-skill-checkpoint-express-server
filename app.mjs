import express from "express";
import { checkHealth } from "./controllers/health.mjs";
import questionsRouter from "./routes/questions.mjs";
import answersRouter from "./routes/answers.mjs";
import voteRouter from "./routes/vote.mjs";
import { validateAnswerExists } from "./middlewares/answers.mjs";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/health", checkHealth);

const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/questions", questionsRouter);
app.use("/questions/:questionId/answers", answersRouter);
app.use("/answers/:answerId/vote", validateAnswerExists, voteRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
