export default function Sidebar({ currentUser, page, setPage, isAdmin, onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        TaskManager
        <span>Team Project Tool</span>
      </div>
      <div className="sidebar-user">
        <div className="uname">{currentUser.name}</div>
        <div className="urole">{currentUser.role === "admin" ? "👑 Admin" : "👤 Member"}</div>
      </div>
      <nav>
        {["dashboard","tasks","board","projects",...(isAdmin?["members"]:[])].map(p => (
          <button key={p} className={page===p?"active":""} onClick={()=>setPage(p)}>
            {p==="dashboard"?"🏠 Dashboard":p==="tasks"?"✅ Tasks":p==="board"?"📋 Board":p==="projects"?"📁 Projects":"👥 Members"}
          </button>
        ))}
      </nav>
      <div className="sidebar-logout">
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
