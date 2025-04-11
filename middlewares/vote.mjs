import { HTTP_STATUS } from "../utils/httpStatus.mjs";
import { errorResponse } from "../utils/responseUtils.mjs";

export const validateVote = (req, res, next) => {
  try {
    const { vote } = req.body;

    if (vote !== 1 && vote !== -1) {
      return errorResponse({
        res,
        message: "Invalid vote value.",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    next();
  } catch (error) {
    return errorResponse({
      res,
      message: "Unable to validate vote.",
    });
  }
};