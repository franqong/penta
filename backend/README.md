# Backend (Penta)

This folder contains the Node.js/Express backend for Penta. The goal of this scaffold is to provide a minimal, secure base so frontend work can continue and backend development can scale later.

## Quick start (local)

1. Copy `.env.example` to `.env` and fill values (DATABASE_URL, TOKEN_SECRET).
2. Install dependencies: `npm install`
3. Run locally: `npm run dev` (uses nodemon)

## Notes

- Authentication: a simple `authRequired` middleware is provided (reads Bearer token or `token` cookie) and verifies JWT using `TOKEN_SECRET`.
- Prisma is configured in `prisma/`.
- Consider adding these next steps when expanding backend:
  - Add `cookie-parser`, `helmet`, `express-rate-limit` and structured logging (winston/pino).
  - Implement refresh tokens, CSRF protections for cookies and secure cookie flags in production.
  - Add tests, CI (GitHub Actions), and a Docker Compose file for local dev with Postgres.

This README is intentionally minimal — expand as the backend grows.
