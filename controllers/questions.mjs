import questionRepo from "../repositories/questions.mjs";
import { HTTP_STATUS } from "../utils/httpStatus.mjs";
import { errorResponse, successResponse } from "../utils/responseUtils.mjs";

export const getQuestions = async (req, res) => {
  try {
    const questions = await questionRepo.findAll();

    return successResponse({ res, data: questions });
  } catch (error) {
    return errorResponse({ res, message: "Unable to fetch questions." });
  }
};

export const getQuestion = async (req, res) => {
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

    return successResponse({ res, data: question });
  } catch (error) {
    console.log(error);
    return errorResponse({ res, message: "Unable to fetch questions." });
  }
};

export const getQuestionByTitleAndCategory = async (req, res) => {
  try {
    const { title, category } = req.query;

    const questions = await questionRepo.findByTitleAndCategory({ title, category });

    return successResponse({ res, data: questions });
  } catch (error) {
    console.log(error)
    return errorResponse({ res, message: "Unable to fetch questions." });
  }
};

export const createQuestion = async (req, res) => {
  try {
    await questionRepo.create(req.body);

    return successResponse({
      res,
      message: "Question created successfully.",
      status: HTTP_STATUS.CREATED,
    });
  } catch (error) {
    console.log(error)
    return errorResponse({ res, message: "Unable to create question." });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    await questionRepo.update(questionId, req.body);

    return successResponse({
      res,
      message: "Question updated successfully.",
    });
  } catch (error) {
    console.log(error)
    return errorResponse({ res, message: "Unable to update question." });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    await questionRepo.remove(questionId);

    return successResponse({
      res,
      message: "Question post has been deleted successfully",
    });
  } catch (error) {
    console.log(error)
    return errorResponse({ res, message: "Unable to delete question." });
  }
};
