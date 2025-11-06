import React from 'react'
 
// BƯỚC 8. GIAO DIỆN (CSS) VÀ MODAL FORM
export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
