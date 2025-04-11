import answerRepo from "../repositories/answers.mjs";
import { errorResponse, successResponse } from "../utils/responseUtils.mjs";

export const getAnswers = async (req, res) => {
  try {
    const { questionId } = req.params;

    const answers = await answerRepo.findAllByQuestionId(questionId);
    if (!answers) {
      return errorResponse({
        res,
        message: "Answers not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    return successResponse({ res, data: answers });
  } catch (error) {
    return errorResponse({ res, message: "Unable to fetch answers." });
  }
};

export const createAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;

    await answerRepo.create({ content, questionId });

    return successResponse({ res, message: "Answer created successfully." });
  } catch (error) {
    return errorResponse({ res, message: "Unable to create answers." });
  }
};
