import { Router } from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestionByTitleAndCategory,
  getQuestions,
  updateQuestion,
} from "../controllers/questions.mjs";
import {
  validateQuestion,
  validateQuestionSearchTerm,
} from "../middlewares/questions.mjs";

const questionsRouter = Router();

questionsRouter.get("/", getQuestions);
questionsRouter.get(
  "/search",
  [validateQuestionSearchTerm],
  getQuestionByTitleAndCategory
);
questionsRouter.get("/:questionId", getQuestion);

questionsRouter.post("/", [validateQuestion], createQuestion);
questionsRouter.put("/:questionId", [validateQuestion], updateQuestion);
questionsRouter.delete("/:questionId", deleteQuestion);

export default questionsRouter;
