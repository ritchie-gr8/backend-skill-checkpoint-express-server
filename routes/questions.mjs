import { Router } from 'express'
import { getQuestion, getQuestions } from '../controllers/questions.mjs';

const questionsRouter = Router();

questionsRouter.get('/', getQuestions);
questionsRouter.get('/:questionId', getQuestion);

export default questionsRouter;
