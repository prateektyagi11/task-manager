import { useState } from "react";
import { uid, fmtDate, isOverdue } from "../utils/helpers";

export default function TasksPage({ currentUser, tasks, projects, users, isAdmin, setTasks, showToast }) {
  const [filters, setFilters] = useState({ status:"all", priority:"all", project:"all", search:"" });
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const setF = (k,v) => setFilters(f=>({...f,[k]:v}));
  const setFo = (k,v) => setForm(f=>({...f,[k]:v}));

  const viewable = isAdmin ? tasks : tasks.filter(t=>t.assigneeId===currentUser.id);
  const filtered = viewable.filter(t => {
    if (filters.status!=="all"&&t.status!==filters.status) return false;
    if (filters.priority!=="all"&&t.priority!==filters.priority) return false;
    if (filters.project!=="all"&&t.projectId!==filters.project) return false;
    if (filters.search&&!t.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const openAdd = () => {
    setForm({ title:"", desc:"", projectId:projects[0]?.id||"", assigneeId:currentUser.id, status:"todo", priority:"medium", due:"" });
    setModal("add");
  };
  const openEdit = t => { setForm({...t}); setModal("edit"); };
  const save = () => {
    if (!form.title.trim()) return alert("Title cannot be empty!");
    if (modal==="add") {
      setTasks(ts=>[...ts,{...form,id:uid(),createdBy:currentUser.id}]);
      showToast("Task added!");
    } else {
      setTasks(ts=>ts.map(t=>t.id===form.id?form:t));
      showToast("Task updated!");
    }
    setModal(null);
  };
  const del = id => { if (window.confirm("Delete this task?")) { setTasks(ts=>ts.filter(t=>t.id!==id)); showToast("Task deleted!"); } };

  return (
    <div>
      <div className="page-top">
        <h2>{isAdmin?"All Tasks":"My Tasks"} ({filtered.length})</h2>
        <button className="btn-add" onClick={openAdd}>+ Add Task</button>
      </div>

      <div className="filters">
        <input placeholder="Search tasks..." value={filters.search} onChange={e=>setF("search",e.target.value)} />
        <select value={filters.status} onChange={e=>setF("status",e.target.value)}>
          <option value="all">All Status</option>
          <option value="todo">Todo</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={filters.priority} onChange={e=>setF("priority",e.target.value)}>
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select value={filters.project} onChange={e=>setF("project",e.target.value)}>
          <option value="all">All Projects</option>
          {projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {filtered.length===0 ? <div className="empty">No tasks found.</div> : (
        <table>
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Project</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => {
              const proj = projects.find(p=>p.id===t.projectId);
              const assignee = users.find(u=>u.id===t.assigneeId);
              const od = isOverdue(t.due,t.status);
              return (
                <tr key={t.id} className={od?"overdue-row":""}>
                  <td>
                    <span style={{textDecoration:t.status==="done"?"line-through":"none"}}>{t.title}</span>
                    {od && <span style={{color:"red",fontSize:11,marginLeft:6}}>(OVERDUE)</span>}
                  </td>
                  <td>{proj?.name||"—"}</td>
                  <td>{assignee?.name||"—"}</td>
                  <td><span className={`badge badge-${t.priority}`}>{t.priority}</span></td>
                  <td>
                    <select value={t.status} onChange={e=>setTasks(ts=>ts.map(x=>x.id===t.id?{...x,status:e.target.value}:x))} style={{fontSize:12,padding:"2px 6px",border:"1px solid #ccc",borderRadius:3}}>
                      <option value="todo">Todo</option>
                      <option value="progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </td>
                  <td style={{color:od?"red":"inherit"}}>{fmtDate(t.due)}</td>
                  <td>
                    <button className="btn-sm btn-edit" onClick={()=>openEdit(t)} style={{marginRight:5}}>Edit</button>
                    {isAdmin && <button className="btn-sm btn-del" onClick={()=>del(t.id)}>Delete</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {modal && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
          <div className="modal">
            <h3>{modal==="add"?"Add New Task":"Edit Task"}</h3>
            <label>Task Title *</label>
            <input placeholder="Enter task title" value={form.title} onChange={e=>setFo("title",e.target.value)} />
            <label>Description</label>
            <textarea placeholder="Describe what needs to be done..." value={form.desc} onChange={e=>setFo("desc",e.target.value)} />
            <div className="two-col">
              <div>
                <label>Project</label>
                <select value={form.projectId} onChange={e=>setFo("projectId",e.target.value)}>
                  {projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label>Assign To</label>
                <select value={form.assigneeId} onChange={e=>setFo("assigneeId",e.target.value)}>
                  {users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
            </div>
            <div className="two-col">
              <div>
                <label>Priority</label>
                <select value={form.priority} onChange={e=>setFo("priority",e.target.value)}>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label>Status</label>
                <select value={form.status} onChange={e=>setFo("status",e.target.value)}>
                  <option value="todo">Todo</option>
                  <option value="progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            <label>Due Date</label>
            <input type="date" value={form.due} onChange={e=>setFo("due",e.target.value)} />
            <div className="modal-actions">
              <button className="btn-cancel" onClick={()=>setModal(null)}>Cancel</button>
              <button className="btn-save" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
