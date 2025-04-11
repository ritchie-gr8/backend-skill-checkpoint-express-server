import answerVoteRepo from "../repositories/vote.mjs";
import { errorResponse, successResponse } from "../utils/responseUtils.mjs";

export const createAnswerVote = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { vote } = req.body;

    await answerVoteRepo.createAnswerVote(answerId, vote);

    return successResponse({
      res,
      message: "Vote on the answer has been recorded successfully.",
    });
  } catch (error) {
    console.log(error);
    return errorResponse({
      res,
      message: "Unable to vote answer.",
    });
  }
};

export const createQuestionVote = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { vote } = req.body;

    await answerVoteRepo.createQuestionVote(questionId, vote);

    return successResponse({
      res,
      message: "Vote on the question has been recorded successfully.",
    });
  } catch (error) {
    console.log(error);
    return errorResponse({
      res,
      message: "Unable to vote question.",
    });
  }
};
