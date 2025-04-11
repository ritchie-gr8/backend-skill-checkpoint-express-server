import connectionPool from "../utils/db.mjs";

const findAll = async () => {
  const { rows } = await connectionPool.query(
    "SELECT id, title, description, category FROM questions"
  );
  return rows;
};

const findById = async (id) => {
  const { rows } = await connectionPool.query(
    "SELECT id, title, description, category FROM questions WHERE id = $1",
    [id]
  );

  return rows?.length > 0 ? rows[0] : null;
};

const findByTitleAndCategory = async ({ title, category }) => {
  let query = "SELECT id, title, description, category FROM questions";
  const params = [];
  const conditions = [];

  if (title) {
    params.push(`%${title}%`);
    conditions.push(`title ILIKE $${params.length}`);
  }

  if (category) {
    params.push(`%${category}%`);
    conditions.push(`category ILIKE $${params.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  const { rows } = await connectionPool.query(query, params);

  return rows;
};

const create = async (question) => {
  const { title, description, category } = question;

  const { rows } = await connectionPool.query(
    `INSERT INTO questions (title, description, category) 
       VALUES ($1, $2, $3) 
       RETURNING id, title, description, category`,
    [title, description, category]
  );

  return rows[0];
};

const update = async (id, question) => {
  const { title, description, category } = question;

  const { rows } = await connectionPool.query(
    `UPDATE questions 
     SET title = $2, description = $3, category = $4 
     WHERE id = $1 
     RETURNING id, title, description, category`,
    [id, title, description, category]
  );

  return rows?.length > 0 ? rows[0] : null;
};

const remove = async (id) => {
  const { rows } = await connectionPool.query(
    "DELETE FROM questions WHERE id = $1",
    [id]
  );

  return rows[0];
};

const questionRepo = {
  findAll,
  findById,
  findByTitleAndCategory,
  create,
  update,
  remove,
};

export default questionRepo;
