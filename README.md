# dd-demo

A full-stack user management demo with React + Vite frontend and Express + SQLite backend.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite 5, Axios |
| Backend  | Express 4, better-sqlite3 |
| Database | SQLite (WAL mode) |

## Quick Start

```bash
npm install
npm run dev
```

Frontend runs at `http://localhost:14001` and proxies `/api` requests to the backend at `http://localhost:14000`.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/users` | List all users |
| GET    | `/api/users/:id` | Get user by ID |
| POST   | `/api/users` | Create user (`name`, `email`, `phone`) |
| PUT    | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

Seed data: 3 demo users are auto-inserted on first run.

## Logo

The `thirtyminus-logo-*.svg` files are branding assets for **thirtyminus** — the minus sign is highlighted in red to suggest decay.

| Variant | Description |
|---------|-------------|
| `thirtyminus-logo.svg` | Dark gray bg, red minus, with tagline |
| `thirtyminus-logo-black.svg` | Pure black bg, red minus, minimal |
| `thirtyminus-logo-gray-minus.svg` | Dark gray bg, gray minus, subtle |
| `thirtyminus-logo-vertical.svg` | Stacked vertical layout |
| `thirtyminus-logo-github.svg` / `.png` | 400×400 square, GitHub-optimized |
