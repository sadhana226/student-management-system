import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, student }) => {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !student) return null;

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm(student.id);
      onClose();
    } catch (err) {
      // Handled in App
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
        <div className="modal-header" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div className="modal-title" style={{ color: '#f87171' }}>
            <AlertTriangle size={22} />
            <span>Confirm Deletion</span>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <AlertTriangle size={30} />
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Are you sure you want to delete this student?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            You are about to remove <strong>{student.name}</strong> (ID: #{student.id}) from the database.
            This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={deleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirm} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
