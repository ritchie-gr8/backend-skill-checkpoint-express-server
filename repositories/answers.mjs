import connectionPool from "../utils/db.mjs";

const findAllByQuestionId = async (questionId) => {
  const { rows } = await connectionPool.query(
    `SELECT 
        a.id, 
        a.content,
        COALESCE(SUM(av.vote), 0) AS total_vote
      FROM 
        answers a
      LEFT JOIN 
        answer_votes av ON a.id = av.answer_id
      WHERE 
        a.question_id = $1
      GROUP BY 
        a.id, a.content
      ORDER BY total_vote DESC`,
    [questionId]
  );

  return rows;
};

const findById = async (answerId) => {
  const { rows } = await connectionPool.query(
    "SELECT id, content FROM answers WHERE id = $1",
    [answerId]
  );

  return rows?.length > 0 ? rows[0] : null;
};

const create = async (answer) => {
  const { rows } = await connectionPool.query(
    `INSERT INTO answers (content, question_id) VALUES ($1, $2) RETURNING *`,
    [answer.content, answer.questionId]
  );

  return rows[0];
};

const removeAnswers = async (questionId) => {
  const { rows } = await connectionPool.query(
    "DELETE FROM answers WHERE question_id = $1",
    [questionId]
  );

  return rows[0];
};

const answerRepo = {
  findAllByQuestionId,
  create,
  removeAnswers,
  findById,
};

export default answerRepo;
