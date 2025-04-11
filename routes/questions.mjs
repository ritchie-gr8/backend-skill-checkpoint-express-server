import { Router } from "express";
import {
  createQuestion,
  getQuestion,
  getQuestions,
} from "../controllers/questions.mjs";
import { validateQuestion } from "../middlewares/questions.mjs";

const questionsRouter = Router();

questionsRouter.get("/", getQuestions);
questionsRouter.get("/:questionId", getQuestion);

questionsRouter.post("/", [validateQuestion], createQuestion);

export default questionsRouter;
