import connectionPool from "../utils/db.mjs";

const createAnswerVote = async (answerId, vote) => {
  const { rows } = await connectionPool.query(
    `INSERT INTO answer_votes (answer_id, vote) VALUES ($1, $2) RETURNING *`,
    [answerId, vote]
  );

  return rows[0];
};

const createQuestionVote = async (questionId, vote) => {
  const { rows } = await connectionPool.query(
    `INSERT INTO question_votes (question_id, vote) VALUES ($1, $2) RETURNING *`,
    [questionId, vote]
  );

  return rows[0];
};

const answerVoteRepo = {
  createAnswerVote,
  createQuestionVote,
};

export default answerVoteRepo;
