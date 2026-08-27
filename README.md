# Habit Tracker

A full-stack habit tracking app. Create habits, mark them done day by day, and see your progress as a GitHub-style contribution heatmap with current and best streaks.

## Features

- Create, edit, and delete habits (with a name, icon, and color)
- Toggle a habit as done for today or any specific day
- Yearly heatmap of completed days per habit
- Automatic current-streak and best-streak calculation

## Tech Stack

**Frontend:** React 19, React Router, Vite, Tailwind CSS + daisyUI, Axios
**Backend:** Node.js, Express 5, MongoDB (Mongoose)

## Project Structure

```
Habit-Tracker/
├── backend/
│   └── src/
│       ├── config/db.js            # MongoDB connection
│       ├── controllers/            # Route handlers (habit CRUD + toggle)
│       ├── models/Habit.js         # Mongoose schema
│       ├── routes/habitsRoutes.js  # /api/habits routes
│       └── server.js               # Express app entry point
└── frontend/
    └── src/
        ├── components/             # HabitCard, Navbar, HabitNotFound
        ├── pages/HomePage.jsx      # Main page
        ├── lib/axios.js            # Configured API client
        └── lib/utils.js            # Date/streak helper functions
```

## Getting Started

### Prerequisites

- Node.js
- A MongoDB connection string (e.g. from MongoDB Atlas, or a local instance)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
```

Start the dev server:

```bash
npm run dev
```

The API runs at `http://localhost:5001/api`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at the URL Vite prints (default `http://localhost:5173`).

## API Reference

| Method | Endpoint                    | Description                          |
|--------|------------------------------|---------------------------------------|
| GET    | `/api/habits`                | Get all habits                        |
| POST   | `/api/habits`                | Create a new habit                    |
| PUT    | `/api/habits/:id`            | Edit a habit                          |
| DELETE | `/api/habits/:id`            | Delete a habit                        |
| POST   | `/api/habits/:id/toggle`     | Toggle a habit as done for today      |
| POST   | `/api/habits/:id/toggle/:day`| Toggle a habit as done for a given day (`YYYY-MM-DD`) |
