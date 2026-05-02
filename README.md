# Team Task Manager

A React-based team project management tool with roles, task board, and project tracking.

## Project Structure

```
team-task-manager/
├── index.html                   # App entry HTML
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # React root render
    ├── App.jsx                  # Root component + state management
    ├── styles/
    │   └── index.css            # All global styles
    ├── data/
    │   └── seedData.js          # Initial users, projects, tasks
    ├── utils/
    │   └── helpers.js           # uid, initials, avatarColor, fmtDate, isOverdue
    ├── components/
    │   ├── LoginPage.jsx        # Login / Register screen
    │   └── Sidebar.jsx          # Navigation sidebar
    └── pages/
        ├── Dashboard.jsx        # Overview stats + project progress
        ├── TasksPage.jsx        # Full task table with filters & CRUD
        ├── BoardPage.jsx        # Kanban board view
        ├── ProjectsPage.jsx     # Project cards with member avatars
        └── MembersPage.jsx      # Team members list (admin only)
```

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Demo Credentials

| Email                  | Password  | Role   |
|------------------------|-----------|--------|
| rahul@example.com      | admin123  | Admin  |
| priya@example.com      | pass123   | Member |
| amit@example.com       | pass123   | Member |
| neha@example.com       | pass123   | Member |
