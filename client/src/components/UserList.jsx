export default function UserList({ users, onEdit, onDelete }) {
  if (!users.length) return <p className="status-msg">暂无用户数据</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>姓名</th><th>邮箱</th><th>电话</th><th>创建时间</th><th>操作</th></tr></thead>
        <tbody>{users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.phone||"-"}</td><td>{u.created_at}</td>
            <td className="actions">
              <button className="btn btn-sm" onClick={() => onEdit(u)}>编辑</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(u.id)}>删除</button>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
