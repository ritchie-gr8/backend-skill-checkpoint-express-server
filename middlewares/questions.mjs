import { errorResponse } from "../utils/responseUtils.mjs";
import { HTTP_STATUS } from "../utils/httpStatus.mjs";

export const validateQuestion = (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      throw new Error("Invalid request data");
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