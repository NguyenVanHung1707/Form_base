import React from 'react'
import SearchForm from './components/SearchForm'
import AddUser from './components/AddUser'
import ResultTable from './components/ResultTable'

// Bước 2: Ngoài ra em cũng đã tạo các component ở bước này
function App() {
  const [keyword, setKeyword] = React.useState('')
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Nguyen Van A', email: 'a@example.com' },
    { id: 2, name: 'Tran Thi B', email: 'b@example.com' },
    { id: 3, name: 'Le Van C', email: 'c@example.com' },
  ])

  // Dùng để truyền người dùng mới xuống ResultTable khi cần (ví dụ: highlight hàng vừa thêm)
  const [newUser, setNewUser] = React.useState(null)

  const handleAdd = (user) => {
    // Thêm người dùng mới lên đầu mảng
    setUsers((prev) => [{ ...user }, ...prev])
    setNewUser(user)
  }

  const handleEdit = (id, updated) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)))
  }

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  return (
    <div className="app-container">
      <div className="header">
        <h2 className="title">Quản lý người dùng</h2>
        <div className="muted">Danh sách & quản lý</div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <SearchForm onChangeValue={setKeyword} />
        </div>
        <div style={{ width: 320 }}>
          <AddUser onAdd={handleAdd} />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div className="card">
          <ResultTable
            users={users}
            keyword={keyword}
            user={newUser}
            onEditUser={handleEdit}
            onDeleteUser={handleDelete}
            onAdded={() => setNewUser(null)}
          />
        </div>
      </div>
    </div>
  )
}

export default App

