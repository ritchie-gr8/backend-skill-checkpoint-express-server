import { Router } from "express";
import { createAnswer, getAnswers } from "../controllers/answers.mjs";
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

export default answersRouter;
