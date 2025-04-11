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
        a.id, a.content`,
    [questionId]
  );

  return rows;
};

const answerRepo = {
  findAllByQuestionId,
};

export default answerRepo;
