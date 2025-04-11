# Express Q&A API

A RESTful API for managing questions and answers with voting, built using Express.js and PostgreSQL.

## Key Features

- CRUD for questions and answers
- Question search (title, category)
- Voting system for questions & answers
- Health check endpoint
- Validation & standardized error handling

## Tech Stack

- Node.js (v18+)
- Express.js
- PostgreSQL

## Project Structure

```
├── controllers
│   ├── answers.mjs
│   ├── health.mjs
│   ├── questions.mjs
│   └── vote.mjs
├── middlewares
│   ├── answers.mjs
│   ├── questions.mjs
│   └── vote.mjs
├── repositories
│   ├── answers.mjs
│   ├── questions.mjs
│   └── vote.mjs
├── routes
│   ├── answers.mjs
│   ├── questions.mjs
│   └── vote.mjs
├── utils
│   ├── db.mjs
│   ├── httpStatus.mjs
│   ├── responseUtils.mjs
│   └── validation.mjs
└── app.mjs
```

## API Endpoints

**Questions**
- `GET /questions`
- `GET /questions/search`
- `GET /questions/:questionId`
- `POST /questions`
- `POST /questions/:questionId/vote`
- `PUT /questions/:questionId`
- `DELETE /questions/:questionId`

**Answers**
- `GET /questions/:questionId/answers`
- `POST /questions/:questionId/answers`
- `DELETE /questions/:questionId/answers`
- `POST /answers/:answerId/vote`

## Setup & Run

1.  **Prerequisites:** Node.js (v18+), PostgreSQL, npm.
2.  Clone the repository.
3.  Install dependencies: `npm install`
4.  Set environment variable: `DATABASE_URL=your_postgres_connection_string`
5.  Start server: `npm run start` (Defaults to port 4000)
