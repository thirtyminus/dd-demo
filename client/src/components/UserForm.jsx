import { useState } from "react";

export default function UserForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [busy, setBusy] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { alert("姓名和邮箱不能为空"); return; }
    setBusy(true);
    try { await onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() }); }
    finally { setBusy(false); }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-field"><label>姓名 *</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="请输入姓名" required /></div>
      <div className="form-field"><label>邮箱 *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="请输入邮箱" required /></div>
      <div className="form-field"><label>电话</label><input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="选填" /></div>
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "提交中..." : "保存"}</button>
        <button className="btn" type="button" onClick={onCancel}>取消</button>
      </div>
    </form>
  );
}
