import connectionPool from "../utils/db.mjs";
import { HTTP_STATUS } from "../utils/httpStatus.mjs";
import { errorResponse, successResponse } from "../utils/responseUtils.mjs";

export const getQuestions = async (req, res) => {
  try {
    const { rows } = await connectionPool.query(
      "SELECT id, title, description, category FROM questions"
    );

    return successResponse({ res, data: rows });
  } catch (error) {
    return errorResponse({ res, message: "Unable to fetch questions." });
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
      return errorResponse({
        res,
        message: "Question not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    return successResponse({ res, data: rows[0] });
  } catch (error) {
    return errorResponse({ res, message: "Unable to fetch questions." });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    await connectionPool.query(
      `INSERT INTO questions (title, description, category) 
       VALUES ($1, $2, $3)
       RETURNING id, title, description, category`,
      [title, description, category]
    );

    return successResponse({
      res,
      message: "Question created successfully.",
      status: HTTP_STATUS.CREATED,
    });
  } catch (error) {
    return errorResponse({ res, message: "Unable to create question." });
  }
};
