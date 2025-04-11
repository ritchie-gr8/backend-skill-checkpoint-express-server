import { Router } from "express";
import { validateVote } from "../middlewares/vote.mjs";
import { createAnswerVote } from "../controllers/vote.mjs";

const voteRouter = Router({ mergeParams: true });

voteRouter.post("/", [validateVote], createAnswerVote);

export default voteRouter;
