import { Router } from "express";
import { createAnswer, deleteAnswers, getAnswers } from "../controllers/answers.mjs";
import {
  validateAnswer,
  validateQuestionExists,
} from "../middlewares/answers.mjs";

const answersRouter = Router({
  mergeParams: true,
});

answersRouter.use(validateQuestionExists);

answersRouter.get("/", getAnswers);
answersRouter.post("/", [validateAnswer], createAnswer);
answersRouter.delete("/", deleteAnswers);

export default answersRouter;
