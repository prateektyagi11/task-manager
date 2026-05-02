import { useState } from "react";
import { uid } from "../utils/helpers";

export default function LoginPage({ users, onLogin, onRegister }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"member" });
  const [err, setErr] = useState("");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const doLogin = () => {
    const u = users.find(u=>u.email===form.email&&u.password===form.password);
    if (!u) return setErr("Wrong email or password!");
    onLogin(u);
  };
  const doRegister = () => {
    if (!form.name||!form.email||!form.password) return setErr("Please fill all fields");
    if (users.find(u=>u.email===form.email)) return setErr("Email already registered");
    onRegister({ id:uid(), ...form });
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>📋 TaskManager</h2>
        <p>Manage your team projects easily</p>
        <div className="tab-btns">
          <button className={tab==="login"?"active":""} onClick={()=>{setTab("login");setErr("");}}>Login</button>
          <button className={tab==="register"?"active":""} onClick={()=>{setTab("register");setErr("");}}>Register</button>
        </div>
        {err && <div className="err-msg">⚠️ {err}</div>}
        {tab==="register" && <input placeholder="Full Name" value={form.name} onChange={e=>set("name",e.target.value)} />}
        <input type="email" placeholder="Email Address" value={form.email} onChange={e=>set("email",e.target.value)} />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>set("password",e.target.value)} onKeyDown={e=>e.key==="Enter"&&(tab==="login"?doLogin():doRegister())} />
        {tab==="register" && (
          <select value={form.role} onChange={e=>set("role",e.target.value)}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button onClick={tab==="login"?doLogin:doRegister}>{tab==="login"?"Login":"Register"}</button>
        <div className="demo-note">
          Demo: rahul@example.com / admin123 (Admin)<br/>
          priya@example.com / pass123 (Member)
        </div>
      </div>
    </div>
  );
}
