const express = require("express");
const cors = require("cors");
const { getDb } = require("./db");
const app = express();
const PORT = process.env.PORT || 14000;
app.use(cors()); app.use(express.json());

app.get("/api/users", (q,r) => { try { r.json({ok:true,data:getDb().prepare("SELECT * FROM users ORDER BY created_at DESC").all()}); } catch(e) { r.status(500).json({ok:false,error:e.message}); } });
app.get("/api/users/:id", (q,r) => { try { const u = getDb().prepare("SELECT * FROM users WHERE id=?").get(q.params.id); if(!u) return r.status(404).json({ok:false,error:"用户不存在"}); r.json({ok:true,data:u}); } catch(e) { r.status(500).json({ok:false,error:e.message}); } });
app.post("/api/users", (q,r) => { try { const {name,email,phone}=q.body; if(!name||!email) return r.status(400).json({ok:false,error:"姓名和邮箱不能为空"}); const ins=getDb().prepare("INSERT INTO users (name,email,phone) VALUES (?,?,?)").run(name,email,phone||""); const u=getDb().prepare("SELECT * FROM users WHERE id=?").get(ins.lastInsertRowid); r.status(201).json({ok:true,data:u}); } catch(e) { if(e.message.includes("UNIQUE")) return r.status(409).json({ok:false,error:"邮箱已被占用"}); r.status(500).json({ok:false,error:e.message}); } });
app.put("/api/users/:id", (q,r) => { try { const {name,email,phone}=q.body; if(!name||!email) return r.status(400).json({ok:false,error:"姓名和邮箱不能为空"}); const res=getDb().prepare("UPDATE users SET name=?,email=?,phone=?,updated_at=datetime('now','localtime') WHERE id=?").run(name,email,phone||"",q.params.id); if(res.changes===0) return r.status(404).json({ok:false,error:"用户不存在"}); const u=getDb().prepare("SELECT * FROM users WHERE id=?").get(q.params.id); r.json({ok:true,data:u}); } catch(e) { if(e.message.includes("UNIQUE")) return r.status(409).json({ok:false,error:"邮箱已被占用"}); r.status(500).json({ok:false,error:e.message}); } });
app.delete("/api/users/:id", (q,r) => { try { const res=getDb().prepare("DELETE FROM users WHERE id=?").run(q.params.id); if(res.changes===0) return r.status(404).json({ok:false,error:"用户不存在"}); r.json({ok:true,message:"删除成功"}); } catch(e) { r.status(500).json({ok:false,error:e.message}); } });

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
