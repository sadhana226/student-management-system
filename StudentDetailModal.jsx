import React from 'react';
import { X, UserCheck, Mail, Phone, BookOpen, Calendar, MapPin, Hash } from 'lucide-react';

const StudentDetailModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div className="modal-header">
          <div className="modal-title">
            <UserCheck size={22} style={{ color: '#818cf8' }} />
            <span>Student Information Profile</span>
          </div>
          <button className="btn-icon" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginBottom: '1.5rem',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#fff',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {student.name}
              </h2>
              <span className={`year-badge year-${student.year}`} style={{ marginTop: '0.3rem' }}>
                Year {student.year} Student
              </span>
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Hash size={14} /> Student ID
              </div>
              <div className="detail-value">#{student.id}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <BookOpen size={14} /> Department
              </div>
              <div className="detail-value">{student.department}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Mail size={14} /> Email Address
              </div>
              <div className="detail-value" style={{ fontSize: '0.9rem' }}>{student.email}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Phone size={14} /> Phone Number
              </div>
              <div className="detail-value">{student.phone}</div>
            </div>

            <div className="detail-item full-width">
              <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> Date of Birth
              </div>
              <div className="detail-value">{student.dateOfBirth}</div>
            </div>

            <div className="detail-item full-width">
              <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={14} /> Residential Address
              </div>
              <div className="detail-value" style={{ fontWeight: 400, color: 'var(--text-main)' }}>
                {student.address}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
