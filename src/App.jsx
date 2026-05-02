import { useState } from "react";
import { USERS, PROJECTS, TASKS } from "./data/seedData";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import BoardPage from "./pages/BoardPage";
import ProjectsPage from "./pages/ProjectsPage";
import MembersPage from "./pages/MembersPage";
import "./styles/index.css";

export default function App() {
  const [users, setUsers] = useState(USERS);
  const [projects, setProjects] = useState(PROJECTS);
  const [tasks, setTasks] = useState(TASKS);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };
  const isAdmin = currentUser?.role === "admin";

  if (!currentUser) {
    return (
      <>
        <LoginPage
          users={users}
          onLogin={u => { setCurrentUser(u); setPage("dashboard"); }}
          onRegister={u => { setUsers(us=>[...us,u]); setCurrentUser(u); showToast("Registered successfully!"); }}
        />
        {toast && <div className="toast">{toast}</div>}
      </>
    );
  }

  return (
    <>
      <div className="app-layout">
        <Sidebar
          currentUser={currentUser}
          page={page}
          setPage={setPage}
          isAdmin={isAdmin}
          onLogout={() => { setCurrentUser(null); setPage("dashboard"); }}
        />
        <div className="main-content">
          {page==="dashboard" && <Dashboard currentUser={currentUser} tasks={tasks} projects={projects} users={users} />}
          {page==="tasks" && <TasksPage currentUser={currentUser} tasks={tasks} projects={projects} users={users} isAdmin={isAdmin} setTasks={setTasks} showToast={showToast} />}
          {page==="board" && <BoardPage currentUser={currentUser} tasks={tasks} projects={projects} users={users} isAdmin={isAdmin} setTasks={setTasks} />}
          {page==="projects" && <ProjectsPage currentUser={currentUser} projects={projects} tasks={tasks} users={users} isAdmin={isAdmin} setProjects={setProjects} setTasks={setTasks} showToast={showToast} />}
          {page==="members" && isAdmin && <MembersPage users={users} tasks={tasks} currentUser={currentUser} setUsers={setUsers} showToast={showToast} />}
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
