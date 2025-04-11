import answerRepo from "../repositories/answers.mjs";
import questionRepo from "../repositories/questions.mjs";
import { HTTP_STATUS } from "../utils/httpStatus.mjs";
import { errorResponse } from "../utils/responseUtils.mjs";

export const validateAnswer = (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      throw new Error("Invalid request data.");
    }

    next();
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
      status: HTTP_STATUS.BAD_REQUEST,
    });
  }
};

export const validateQuestionExists = async (req, res, next) => {
  try {
    const { questionId } = req.params;

    const question = await questionRepo.findById(questionId);
    if (!question) {
      return errorResponse({
        res,
        message: "Question not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    req.question = question;
    next();
  } catch (error) {
    return errorResponse({
      res,
      message: "Unable to fetch question.",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};

export const validateAnswerExists = async (req, res, next) => {
  try {
    const { answerId } = req.params;

    const answer = await answerRepo.findById(answerId);
    if (!answer) {
      return errorResponse({
        res,
        message: "Answer not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    req.answer = answer;
    next();
  } catch (error) {
    return errorResponse({
      res,
      message: "Unable to fetch answer.",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};
