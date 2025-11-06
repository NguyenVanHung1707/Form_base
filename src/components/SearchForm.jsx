import React from 'react'

// Bước 3: Em code component SearchForm
export default function SearchForm({ onChangeValue }) {
  const [value, setValue] = React.useState('')

  const handleChange = (e) => {
    const v = e.target.value
    setValue(v)
    onChangeValue && onChangeValue(v)
  }

  return (
    <div className="card search-card">
      <label className="muted" style={{ display: 'block', marginBottom: 8 }}>Tìm kiếm</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Tên hoặc email..."
        className="input"
      />
    </div>
  )
}
