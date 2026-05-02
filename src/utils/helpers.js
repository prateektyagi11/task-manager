export const COLORS = ["#5c6bc0","#26a69a","#ef5350","#ffa726","#66bb6a","#ab47bc","#29b6f6","#8d6e63"];

export const uid = () => Math.random().toString(36).slice(2,9);

export const initials = n => n.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

export const avatarColor = n => COLORS[n.charCodeAt(0)%COLORS.length];

export const fmtDate = d => d ? new Date(d).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) : "—";

export const isOverdue = (due, status) => due && status !== "done" && new Date(due) < new Date();
