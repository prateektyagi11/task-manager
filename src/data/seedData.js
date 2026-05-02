export const USERS = [
  { id:"u1", name:"Rahul Sharma", email:"rahul@example.com", password:"admin123", role:"admin" },
  { id:"u2", name:"Priya Singh", email:"priya@example.com", password:"pass123", role:"member" },
  { id:"u3", name:"Amit Kumar", email:"amit@example.com", password:"pass123", role:"member" },
  { id:"u4", name:"Neha Patel", email:"neha@example.com", password:"pass123", role:"member" },
];

export const PROJECTS = [
  { id:"p1", name:"College Fest Website", desc:"Build website for annual college fest", members:["u1","u2","u3"], createdBy:"u1" },
  { id:"p2", name:"Library Management System", desc:"Desktop app to manage library books and students", members:["u1","u3","u4"], createdBy:"u1" },
  { id:"p3", name:"Attendance Tracker", desc:"Track student attendance with QR codes", members:["u1","u2"], createdBy:"u1" },
];

export const TASKS = [
  { id:"t1", title:"Design home page", desc:"Make the home page look good", projectId:"p1", assigneeId:"u2", status:"done", priority:"high", due:"2025-04-10", createdBy:"u1" },
  { id:"t2", title:"Add registration form", desc:"Students should be able to register", projectId:"p1", assigneeId:"u3", status:"progress", priority:"high", due:"2025-05-10", createdBy:"u1" },
  { id:"t3", title:"Connect to database", desc:"Use MySQL to store data", projectId:"p1", assigneeId:"u2", status:"todo", priority:"medium", due:"2025-05-20", createdBy:"u1" },
  { id:"t4", title:"Create ER diagram", desc:"Draw the ER diagram first", projectId:"p2", assigneeId:"u4", status:"done", priority:"high", due:"2025-04-05", createdBy:"u1" },
  { id:"t5", title:"Implement login screen", desc:"Admin and student login", projectId:"p2", assigneeId:"u3", status:"progress", priority:"high", due:"2025-05-08", createdBy:"u1" },
  { id:"t6", title:"Book issue/return module", desc:"Core feature of the system", projectId:"p2", assigneeId:"u4", status:"todo", priority:"medium", due:"2025-05-25", createdBy:"u1" },
  { id:"t7", title:"QR code generation", desc:"Generate QR for each student", projectId:"p3", assigneeId:"u2", status:"progress", priority:"high", due:"2025-05-04", createdBy:"u1" },
  { id:"t8", title:"Build attendance report", desc:"Export attendance as Excel", projectId:"p3", assigneeId:"u1", status:"todo", priority:"low", due:"2025-06-01", createdBy:"u1" },
];
