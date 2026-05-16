import { useState, useEffect, useCallback } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "./api/users";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [toast, setToast] = useState(null);
  const showToast = m => { setToast(m); setTimeout(() => setToast(null), 2500); };
  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { const r = await fetchUsers(); if (r.ok) setUsers(r.data); else setError(r.error); }
    catch (e) { setError(e.response?.data?.error || e.message); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const handleDelete = async id => {
    if (!window.confirm("确定删除？")) return;
    const r = await deleteUser(id);
    if (r.ok) { showToast("删除成功"); load(); }
  };

  const handleSubmit = async data => {
    const r = formMode === "new" ? await createUser(data) : await updateUser(editingUser.id, data);
    if (r.ok) { showToast(formMode === "new" ? "新增成功" : "更新成功"); setFormMode(null); setEditingUser(null); load(); }
    else alert(r.error);
  };

  return (
    <div className="app">
      <header className="header"><h1>用户管理</h1></header>
      {toast && <div className="toast">{toast}</div>}
      {formMode ? (
        <section className="section">
          <h2>{formMode === "new" ? "新增用户" : "编辑用户"}</h2>
          <UserForm initial={editingUser} onSubmit={handleSubmit} onCancel={() => { setFormMode(null); setEditingUser(null); }} />
        </section>
      ) : (
        <section className="section">
          <div className="section-header">
            <h2>用户列表</h2>
            <button className="btn btn-primary" onClick={() => { setEditingUser(null); setFormMode("new"); }}>+ 新增用户</button>
          </div>
          {loading ? <p className="status-msg">加载中...</p> : error ? <p className="status-msg error">{error}</p> :
          <UserList users={users} onEdit={u => { setEditingUser(u); setFormMode("edit"); }} onDelete={handleDelete} />}
        </section>
      )}
    </div>
  );
}
