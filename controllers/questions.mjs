import connectionPool from "../utils/db.mjs";
import { HTTP_STATUS } from "../utils/httpStatus.mjs";
import { errorResponse, successResponse } from "../utils/responseUtils.mjs";

export const getQuestions = async (req, res) => {
  try {
    const { rows } = await connectionPool.query(
      "SELECT id, title, description, category FROM questions"
    );

    return successResponse(res, rows);
  } catch (error) {
    return errorResponse(res, "Unable to fetch questions.");
  }
};

export const getQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const { rows } = await connectionPool.query(
      "SELECT id, title, description, category FROM questions WHERE id = $1",
      [questionId]
    );

    if (rows?.length === 0) {
      return errorResponse(res, "Question not found", HTTP_STATUS.NOT_FOUND);
    }

    return successResponse(res, rows);
  } catch (error) {
    return errorResponse(res, "Unable to fetch questions.");
  }
};
