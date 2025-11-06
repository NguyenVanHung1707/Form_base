import React from 'react'
import Modal from './Modal'
import UserForm from './UserForm'

// Bước 4: Em code component ResultTable
export default function ResultTable({ users = [], keyword = '', user = null, onEditUser, onDeleteUser, onAdded }) {
  const [editing, setEditing] = React.useState(null)
  const [highlightId, setHighlightId] = React.useState(null)
  const [localUsers, setLocalUsers] = React.useState(users || [])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (user && user.id) {
  setHighlightId(user.id)
      const t = setTimeout(() => {
        setHighlightId(null)
        onAdded && onAdded()
      }, 1500)
      return () => clearTimeout(t)
    }
  }, [user, onAdded])

  // Đồng bộ `localUsers` khi prop `users` được component cha truyền xuống
  React.useEffect(() => {
    if (users && users.length) {
      setLocalUsers(users)
      return
    }

  //  gọi API JSONPlaceholder một lần khi mount
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()
        if (!cancelled) setLocalUsers(data)
      } catch (err) {
        console.error('Failed to load users', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [users])

  // Bước 6: SỬA NGƯỜI DÙNG (EDIT)
  const handleStartEdit = (u) => {
    setEditing({ ...u, address: { ...(u.address || {}) } })
  }

  const handleEditChange = (key, value) => {
    // Hỗ trợ cập nhật các key lồng 
    if (!editing) return
    if (key.includes('.')) {
      const [parent, child] = key.split('.')
      setEditing((e) => ({ ...e, [parent]: { ...(e[parent] || {}), [child]: value } }))
    } else {
      setEditing((e) => ({ ...e, [key]: value }))
    }
  }

  const handleSave = () => {
    if (!editing) return
    const id = editing.id
    // Cập nhật `localUsers`
    setLocalUsers((prev) => prev.map((p) => (p.id === id ? { ...p, ...editing } : p)))
    onEditUser && onEditUser(id, editing)
    setEditing(null)
  }

  const handleEditSubmit = (updated) => {
    setEditing(updated)
    // Tái sử dụng: cập nhật `localUsers
    const id = updated.id
    setLocalUsers((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)))
    onEditUser && onEditUser(id, updated)
    setEditing(null)
  }
  // BƯỚC 7: XÓA NGƯỜI DÙNG (DELETE)
  const handleDelete = (id) => {
    // Loại bỏ khỏi `localUsers`
    setLocalUsers((prev) => prev.filter((u) => u.id !== id))
    if (editing && editing.id === id) setEditing(null)
    onDeleteUser && onDeleteUser(id)
  }

  const filtered = (localUsers || []).filter((u) => {
    if (!keyword) return true
    const k = keyword.toLowerCase()
    return (u.name || '').toLowerCase().includes(k) || (u.email || '').toLowerCase().includes(k)
  })

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 6, overflow: 'hidden' }}>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#fafafa' }}>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Tên</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
            <th style={{ padding: 8 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} style={{ background: highlightId === u.id ? '#fffbdd' : 'transparent' }}>
              <td style={{ padding: 8 }}>
                {u.name}
              </td>
              <td style={{ padding: 8 }}>
                  {u.email}
              </td>
              <td style={{ padding: 8, textAlign: 'center' }}>
                  <>
                    <button onClick={() => handleStartEdit(u)} style={{ marginRight: 8 }}>
                      Sửa
                    </button>
                    <button onClick={() => handleDelete(u.id)}>Xóa</button>
                  </>
              </td>
            </tr>
          ))}
          {editing && (
            <tr>
              <td colSpan={3} style={{ padding: 0 }}>
                <div style={{ padding: 12 }}>
                  {/* Hiển thị modal để sửa người dùng */}
                  <Modal onClose={() => setEditing(null)}>
                    <UserForm initialUser={editing} onSubmit={handleEditSubmit} onCancel={() => setEditing(null)} />
                  </Modal>
                </div>
              </td>
            </tr>
          )}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: 12, textAlign: 'center', color: '#777' }}>
                Không có kết quả
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
