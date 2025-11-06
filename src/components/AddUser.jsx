import React from 'react'
import Modal from './Modal'
import UserForm from './UserForm'

// Bước 5: Em code component AddUser
export default function AddUser({ onAdd }) {
  const [adding, setAdding] = React.useState(false)

  const handleSubmit = (user) => {
    const payload = { ...user, id: Date.now() }
    onAdd && onAdd(payload)
    setAdding(false)
  }

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <button onClick={() => setAdding(true)} style={{ padding: '8px 12px' }}>
          Thêm
        </button>
      </div>

      {adding && (
        <Modal onClose={() => setAdding(false)}>
          <UserForm initialUser={null} onSubmit={handleSubmit} onCancel={() => setAdding(false)} />
        </Modal>
      )}
    </div>
  )
}
