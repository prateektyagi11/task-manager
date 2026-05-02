import { useState } from "react";
import { uid, initials, avatarColor, isOverdue } from "../utils/helpers";

export default function ProjectsPage({ currentUser, projects, tasks, users, isAdmin, setProjects, setTasks, showToast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", desc:"", members:[] });
  const setFo = (k,v) => setForm(f=>({...f,[k]:v}));

  const myProjects = isAdmin ? projects : projects.filter(p=>p.members.includes(currentUser.id));

  const addProject = () => {
    if (!form.name.trim()) return alert("Project name required!");
    setProjects(ps=>[...ps,{id:uid(),...form,members:[...form.members,currentUser.id],createdBy:currentUser.id}]);
    showToast("Project created!");
    setModal(false);
  };
  const delProject = id => {
    if (!window.confirm("Delete this project and all its tasks?")) return;
    setProjects(ps=>ps.filter(p=>p.id!==id));
    setTasks(ts=>ts.filter(t=>t.projectId!==id));
    showToast("Project deleted!");
  };

  return (
    <div>
      <div className="page-top">
        <h2>Projects ({myProjects.length})</h2>
        {isAdmin && <button className="btn-add" onClick={()=>{setForm({name:"",desc:"",members:[]});setModal(true);}}>+ New Project</button>}
      </div>

      {myProjects.length===0 && <div className="empty">No projects found.</div>}

      <div className="proj-grid">
        {myProjects.map(proj => {
          const pt = tasks.filter(t=>t.projectId===proj.id);
          const done = pt.filter(t=>t.status==="done").length;
          const pct = pt.length ? Math.round(done/pt.length*100) : 0;
          const od = pt.filter(t=>isOverdue(t.due,t.status)).length;
          const members = proj.members.map(id=>users.find(u=>u.id===id)).filter(Boolean);

          return (
            <div className="proj-card" key={proj.id}>
              <h3>{proj.name}</h3>
              <div className="proj-desc">{proj.desc}</div>
              <div className="proj-progress">
                <div className="proj-progress-bar" style={{width:pct+"%"}} />
              </div>
              <div className="proj-meta">
                <span>{pct}% done</span>
                <span>{done}/{pt.length} tasks</span>
                {od>0 && <span style={{color:"red"}}>⚠ {od} overdue</span>}
              </div>
              <div style={{marginTop:10,display:"flex",gap:5,flexWrap:"wrap"}}>
                {members.map(u=>(
                  <span key={u.id} title={u.name} style={{display:"inline-block",background:avatarColor(u.name),color:"white",borderRadius:"50%",width:28,height:28,lineHeight:"28px",textAlign:"center",fontSize:11,fontWeight:"bold"}}>
                    {initials(u.name)}
                  </span>
                ))}
              </div>
              {isAdmin && (
                <div className="proj-actions">
                  <button className="btn-sm btn-del" onClick={()=>delProject(proj.id)}>Delete</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {modal && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setModal(false)}>
          <div className="modal">
            <h3>Create New Project</h3>
            <label>Project Name *</label>
            <input placeholder="e.g. Library Management System" value={form.name} onChange={e=>setFo("name",e.target.value)} />
            <label>Description</label>
            <textarea placeholder="What is this project about?" value={form.desc} onChange={e=>setFo("desc",e.target.value)} />
            <label>Select Members</label>
            <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:12}}>
              {users.filter(u=>u.id!==currentUser.id).map(u=>(
                <label key={u.id} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13}}>
                  <input type="checkbox" checked={form.members.includes(u.id)} onChange={e=>setFo("members",e.target.checked?[...form.members,u.id]:form.members.filter(id=>id!==u.id))} />
                  {u.name} <span className={`badge badge-${u.role}`}>{u.role}</span>
                </label>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn-save" onClick={addProject}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
