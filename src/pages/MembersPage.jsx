import { useState } from "react";
import { uid, initials, avatarColor } from "../utils/helpers";

export default function MembersPage({ users, tasks, currentUser, setUsers, showToast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"member" });
  const setFo = (k,v) => setForm(f=>({...f,[k]:v}));

  const addMember = () => {
    if (!form.name||!form.email||!form.password) return alert("All fields required!");
    if (users.find(u=>u.email===form.email)) return alert("Email already exists!");
    setUsers(us=>[...us,{id:uid(),...form}]);
    showToast("Member added!");
    setModal(false);
    setForm({name:"",email:"",password:"",role:"member"});
  };

  const removeMember = id => {
    if (!window.confirm("Remove this member?")) return;
    setUsers(us=>us.filter(u=>u.id!==id));
    showToast("Member removed!");
  };

  const toggleRole = id => {
    setUsers(us=>us.map(u=>u.id===id?{...u,role:u.role==="admin"?"member":"admin"}:u));
    showToast("Role updated!");
  };

  return (
    <div>
      <div className="page-top">
        <h2>Team Members ({users.length})</h2>
        <button className="btn-add" onClick={()=>setModal(true)}>+ Add Member</button>
      </div>

      <div className="members-list">
        {users.map(u => {
          const ut = tasks.filter(t=>t.assigneeId===u.id);
          const done = ut.filter(t=>t.status==="done").length;
          return (
            <div className="member-row" key={u.id}>
              <div className="mem-avatar" style={{background:avatarColor(u.name)}}>{initials(u.name)}</div>
              <div className="mem-info">
                <div className="mem-name">{u.name} {u.id===currentUser.id&&<span style={{fontSize:11,color:"#3f51b5"}}>(You)</span>}</div>
                <div className="mem-email">{u.email}</div>
                <div className="mem-stats">{ut.length} tasks assigned · {done} completed</div>
              </div>
              <span className={`badge badge-${u.role}`}>{u.role}</span>
              {u.id!==currentUser.id && (
                <>
                  <button className="btn-sm btn-role" onClick={()=>toggleRole(u.id)}>Toggle Role</button>
                  <button className="btn-sm btn-del" onClick={()=>removeMember(u.id)}>Remove</button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {modal && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setModal(false)}>
          <div className="modal">
            <h3>Add New Member</h3>
            <label>Full Name *</label>
            <input placeholder="e.g. Rohit Verma" value={form.name} onChange={e=>setFo("name",e.target.value)} />
            <label>Email *</label>
            <input type="email" placeholder="rohit@example.com" value={form.email} onChange={e=>setFo("email",e.target.value)} />
            <label>Password *</label>
            <input type="password" placeholder="Set a password for them" value={form.password} onChange={e=>setFo("password",e.target.value)} />
            <label>Role</label>
            <select value={form.role} onChange={e=>setFo("role",e.target.value)}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn-save" onClick={addMember}>Add Member</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
