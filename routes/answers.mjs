import { Router } from "express";
import { getAnswers } from "../controllers/answers.mjs";
import { validateQuestionExists } from "../middlewares/answers.mjs";

const answersRouter = Router({
    mergeParams: true,
});

answersRouter.use(validateQuestionExists);

answersRouter.get("/", getAnswers);

export default answersRouter;
