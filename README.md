# Portfolio

A work-in-progress full-stack portfolio built with Next.js, React, TypeScript,
Tailwind CSS, and MongoDB.

The current app is a starter foundation: it has a polished landing page, basic
project metadata, API routes, request validation, MongoDB connection handling,
linting, formatting, and environment variable examples.

## Tech Stack

- Next.js – React framework for building full-stack web apps (frontend + backend).
- React – JavaScript library for creating interactive user interfaces.
- TypeScript – Adds type safety to JavaScript, reducing bugs.
- Tailwind CSS – Utility-first CSS framework for fast UI styling.
- MongoDB Node.js Driver – Connects Node.js applications directly to MongoDB databases.
- Zod – Validates forms, APIs, and data with TypeScript support.
- React Hook Form – Handles forms efficiently with validation and minimal re-renders.
- ESLint – Finds and fixes code quality issues.
- Prettier – Automatically formats code consistently.
- Lucide React – Modern SVG icons for React applications.

## Current Features

- Responsive portfolio homepage in `src/app/page.tsx`
- Global layout and metadata in `src/app/layout.tsx`
- Tailwind-powered global styles in `src/app/globals.css`
- Health check endpoint at `GET /api/health`
- Contact message endpoint at `POST /api/contact`
- Contact payload validation with Zod
- Reusable MongoDB client helper with development connection caching
- Example environment file in `.env.example`

## Getting Started

Install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env
```

Update `.env` if needed:

```env
MONGODB_URI="mongodb://127.0.0.1:27017"
MONGODB_DB="portfolio"
```

Run the development server:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after building.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run format
```

Formats the project with Prettier.

## API Routes

### `GET /api/health`

Returns a basic JSON health response:

```json
{
  "ok": true,
  "app": "portfolio",
  "database": "mongodb",
  "timestamp": "2026-06-16T00:00:00.000Z"
}
```

### `POST /api/contact`

Stores a validated contact message in MongoDB.

Expected request body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Your message goes here."
}
```

Successful response:

```json
{
  "id": "inserted-mongodb-document-id"
}
```

Invalid requests return `400` with validation details.

## Project Structure

```text
src/
  app/
    api/
      contact/route.ts
      health/route.ts
    globals.css
    layout.tsx
    page.tsx
  lib/
    validations/contact.ts
    mongodb.ts
    utils.ts
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string. |
| `MONGODB_DB` | No | Database name. Defaults to `portfolio`. |

## Notes

- The homepage is currently a starter portfolio shell and can be customized with
  real personal details, projects, experience, and contact UI.
- The contact API is ready for a form, but the visible form has not been added
  yet.
- This project uses Next.js 16, so check the local Next.js docs in
  `node_modules/next/dist/docs/` before changing framework APIs or conventions.
