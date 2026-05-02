import { useState } from "react";
import { fmtDate, isOverdue } from "../utils/helpers";

export default function BoardPage({ currentUser, tasks, projects, users, isAdmin, setTasks }) {
  const [projFilter, setProjFilter] = useState("all");
  const viewable = isAdmin ? tasks : tasks.filter(t=>t.assigneeId===currentUser.id);
  const filtered = projFilter==="all" ? viewable : viewable.filter(t=>t.projectId===projFilter);

  const cols = [
    { id:"todo", label:"📝 Todo" },
    { id:"progress", label:"🔄 In Progress" },
    { id:"done", label:"✅ Done" },
  ];

  const moveTo = (task, status) => setTasks(ts=>ts.map(t=>t.id===task.id?{...t,status}:t));

  return (
    <div>
      <div className="page-top">
        <h2>Task Board</h2>
        <select onChange={e=>setProjFilter(e.target.value)} value={projFilter} style={{padding:"7px 10px",border:"1px solid #ccc",borderRadius:4,fontSize:13}}>
          <option value="all">All Projects</option>
          {projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div className="board">
        {cols.map(col => {
          const colTasks = filtered.filter(t=>t.status===col.id);
          return (
            <div className="board-col" key={col.id}>
              <div className="board-col-title">{col.label} ({colTasks.length})</div>
              {colTasks.length===0 && <div style={{fontSize:12,color:"#bbb",textAlign:"center",padding:"20px 0"}}>Nothing here</div>}
              {colTasks.map(t => {
                const proj = projects.find(p=>p.id===t.projectId);
                const assignee = users.find(u=>u.id===t.assigneeId);
                const od = isOverdue(t.due, t.status);
                return (
                  <div key={t.id} className={`board-card${od?" bc-overdue":""}`}>
                    <div className="bc-title">{t.title}</div>
                    <div className="bc-meta">
                      <span className={`badge badge-${t.priority}`}>{t.priority}</span>
                      <span>{proj?.name}</span>
                      {t.due && <span style={{color:od?"red":"inherit"}}>📅 {fmtDate(t.due)}</span>}
                    </div>
                    {assignee && <div style={{fontSize:11,color:"#999",marginTop:4}}>👤 {assignee.name}</div>}
                    <div className="bc-actions">
                      {cols.filter(c=>c.id!==col.id).map(c=>(
                        <button key={c.id} className="btn-sm" style={{fontSize:11}} onClick={()=>moveTo(t,c.id)}>
                          → {c.label.split(" ")[1]||c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
