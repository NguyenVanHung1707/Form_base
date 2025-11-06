import React from 'react'
//BƯỚC 8. GIAO DIỆN (CSS) VÀ MODAL FORM 
export default function UserForm({ initialUser = null, onSubmit, onCancel }) {
  const initial = initialUser
    ? { ...initialUser, address: { ...(initialUser.address || {}) } }
    : {
        name: '',
        username: '',
        email: '',
        address: { street: '', suite: '', city: '' },
        phone: '',
        website: '',
      }

  const [user, setUser] = React.useState(initial)

  React.useEffect(() => {
    setUser(initial)
  }, [initialUser])

  const handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    if (['street', 'suite', 'city'].includes(id)) {
      setUser((u) => ({ ...u, address: { ...u.address, [id]: value } }))
    } else {
      setUser((u) => ({ ...u, [id]: value }))
    }
  }

  const handleSubmit = (e) => {
    e && e.preventDefault()
    if (!user.name.trim() || !user.username?.trim()) {
      alert('Vui lòng nhập Name và Username!')
      return
    }
    onSubmit && onSubmit(user)
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ minWidth: 320 }}>
      <h4 style={{ marginTop: 0 }}>{initialUser ? 'Sửa người dùng' : 'Thêm người dùng'}</h4>

      <div style={{ marginBottom: 8 }}>
        <label className="muted" style={{ display: 'block', marginBottom: 6 }}>Name</label>
        <input id="name" className="input" value={user.name} onChange={handleChange} placeholder="Họ và tên" />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label className="muted" style={{ display: 'block', marginBottom: 6 }}>Username</label>
        <input id="username" className="input" value={user.username} onChange={handleChange} placeholder="Username" />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label className="muted" style={{ display: 'block', marginBottom: 6 }}>Email</label>
        <input id="email" className="input" value={user.email} onChange={handleChange} placeholder="Email" />
      </div>

      <fieldset style={{ marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid rgba(255,255,255,0.03)' }}>
        <legend style={{ fontSize: 12 }} className="muted">Address</legend>
        <div style={{ marginBottom: 6 }}>
          <input id="street" className="input" value={user.address.street} onChange={handleChange} placeholder="Street" />
        </div>
        <div style={{ marginBottom: 6 }}>
          <input id="suite" className="input" value={user.address.suite} onChange={handleChange} placeholder="Suite" />
        </div>
        <div>
          <input id="city" className="input" value={user.address.city} onChange={handleChange} placeholder="City" />
        </div>
      </fieldset>

      <div style={{ marginBottom: 8 }}>
        <input id="phone" className="input" value={user.phone} onChange={handleChange} placeholder="Phone" />
      </div>

      <div style={{ marginBottom: 8 }}>
        <input id="website" className="input" value={user.website} onChange={handleChange} placeholder="Website" />
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" onClick={onCancel} className="btn-ghost">
          Hủy
        </button>
        <button type="submit" className="btn-primary">
          Lưu
        </button>
      </div>
    </form>
  )
}
