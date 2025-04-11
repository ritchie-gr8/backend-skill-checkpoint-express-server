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
  validateQuestionExists,
  validateQuestionSearchTerm,
} from "../middlewares/questions.mjs";
import { validateVote } from "../middlewares/vote.mjs";
import { createQuestionVote } from "../controllers/vote.mjs";

const questionsRouter = Router();

questionsRouter.get("/", getQuestions);
questionsRouter.get(
  "/search",
  [validateQuestionSearchTerm],
  getQuestionByTitleAndCategory
);

questionsRouter.post(
  "/:questionId/vote",
  [validateQuestionExists, validateVote],
  createQuestionVote
);

questionsRouter.get("/:questionId", getQuestion);
questionsRouter.post("/", [validateQuestion], createQuestion);
questionsRouter.put(
  "/:questionId",
  [validateQuestionExists, validateQuestion],
  updateQuestion
);
questionsRouter.delete(
  "/:questionId",
  [validateQuestionExists],
  deleteQuestion
);

export default questionsRouter;
