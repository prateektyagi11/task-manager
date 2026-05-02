import { isOverdue } from "../utils/helpers";

export default function Dashboard({ currentUser, tasks, projects }) {
  const myTasks = tasks.filter(t=>t.assigneeId===currentUser.id);
  const done = myTasks.filter(t=>t.status==="done").length;
  const inProg = myTasks.filter(t=>t.status==="progress").length;
  const overdue = myTasks.filter(t=>isOverdue(t.due,t.status)).length;

  return (
    <div>
      <div className="page-top">
        <h2>Hello, {currentUser.name.split(" ")[0]}! 👋</h2>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <div className="num">{myTasks.length}</div>
          <div className="lbl">Total My Tasks</div>
        </div>
        <div className="stat-box orange">
          <div className="num">{inProg}</div>
          <div className="lbl">In Progress</div>
        </div>
        <div className="stat-box green">
          <div className="num">{done}</div>
          <div className="lbl">Completed</div>
        </div>
        <div className="stat-box red">
          <div className="num">{overdue}</div>
          <div className="lbl">Overdue</div>
        </div>
      </div>

      <h3 style={{marginBottom:12,color:"#444",fontSize:16}}>Projects Overview</h3>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {projects.map(proj => {
          const pt = tasks.filter(t=>t.projectId===proj.id);
          const d = pt.filter(t=>t.status==="done").length;
          const pct = pt.length ? Math.round(d/pt.length*100) : 0;
          const od = pt.filter(t=>isOverdue(t.due,t.status)).length;
          return (
            <div key={proj.id} style={{background:"white",border:"1px solid #ddd",borderRadius:6,padding:"14px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div>
                  <span style={{fontWeight:"bold",fontSize:14,color:"#333"}}>{proj.name}</span>
                  <span style={{fontSize:12,color:"#888",marginLeft:10}}>{proj.desc}</span>
                </div>
                <div style={{fontSize:12,color:"#666"}}>{d}/{pt.length} tasks done {od>0&&<span style={{color:"red",marginLeft:6}}>⚠ {od} overdue</span>}</div>
              </div>
              <div className="proj-progress">
                <div className="proj-progress-bar" style={{width:pct+"%"}} />
              </div>
              <div style={{fontSize:11,color:"#999"}}>{pct}% complete</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
