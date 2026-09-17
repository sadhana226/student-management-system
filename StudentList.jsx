import React, { useState } from 'react';
import {
  Eye,
  Edit3,
  Trash2,
  UserX,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckSquare,
  Square,
  Trash,
  Download,
  Mail,
  Phone,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';

const StudentList = ({
  students,
  loading,
  onView,
  onEdit,
  onDelete,
  onBatchDelete,
  onExportSelected,
  searchTerm,
  viewMode,
}) => {
  // Sorting state
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  if (loading) {
    return (
      <div className="glass-card loading-container">
        <div className="spinner"></div>
        <p>Fetching student records from Spring Boot REST API...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="glass-card empty-state">
        <UserX className="empty-icon" />
        <h3>No Students Found</h3>
        <p>
          {searchTerm
            ? `No student record matches "${searchTerm}". Try adjusting your search or active filter.`
            : 'No students have been added to the system yet. Click "Add Student" or "Demo Data" above to begin.'}
        </p>
      </div>
    );
  }

  // Handle Header Click for Sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort Student Array
  const sortedStudents = [...students].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination slice
  const totalPages = pageSize === 'ALL' ? 1 : Math.ceil(sortedStudents.length / Number(pageSize));
  const validPage = Math.min(currentPage, totalPages || 1);
  const startIndex = pageSize === 'ALL' ? 0 : (validPage - 1) * Number(pageSize);
  const paginatedStudents = pageSize === 'ALL' ? sortedStudents : sortedStudents.slice(startIndex, startIndex + Number(pageSize));

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedStudents.map((s) => s.id));
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'S';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown size={13} style={{ opacity: 0.4 }} />;
    return sortDirection === 'asc' ? <ArrowUp size={13} className="text-accent" /> : <ArrowDown size={13} className="text-accent" />;
  };

  return (
    <div>
      {/* Floating Batch Action Bar when items selected */}
      {selectedIds.length > 0 && (
        <div
          className="glass-card"
          style={{
            padding: '0.85rem 1.25rem',
            marginBottom: '1rem',
            background: 'rgba(99, 102, 241, 0.18)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <CheckSquare size={18} style={{ color: '#818cf8' }} />
            <span>{selectedIds.length} {selectedIds.length === 1 ? 'student' : 'students'} selected</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => onExportSelected(students.filter((s) => selectedIds.includes(s.id)))}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
            >
              <Download size={14} /> Export Selected ({selectedIds.length})
            </button>

            <button
              onClick={() => {
                onBatchDelete(selectedIds);
                setSelectedIds([]);
              }}
              className="btn btn-danger"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
            >
              <Trash size={14} /> Delete Selected ({selectedIds.length})
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.65rem', fontSize: '0.825rem' }}
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODE: TABLE */}
      {viewMode === 'table' ? (
        <div className="glass-card table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === paginatedStudents.length}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer', accentColor: '#6366f1' }}
                  />
                </th>
                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    ID {renderSortIcon('id')}
                  </div>
                </th>
                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    Student Name {renderSortIcon('name')}
                  </div>
                </th>
                <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    Email Address {renderSortIcon('email')}
                  </div>
                </th>
                <th>Phone</th>
                <th onClick={() => handleSort('department')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    Department {renderSortIcon('department')}
                  </div>
                </th>
                <th onClick={() => handleSort('year')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    Year {renderSortIcon('year')}
                  </div>
                </th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => {
                const isSelected = selectedIds.includes(student.id);
                return (
                  <tr key={student.id} style={{ background: isSelected ? 'rgba(99, 102, 241, 0.08)' : '' }}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(student.id)}
                        style={{ cursor: 'pointer', accentColor: '#6366f1' }}
                      />
                    </td>
                    <td>
                      <span className="student-id">#{student.id}</span>
                    </td>
                    <td>
                      <div className="student-name-col">
                        <div className="avatar-circle">{getInitials(student.name)}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{student.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                            DOB: {student.dateOfBirth || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>
                      <span className="dept-badge">{student.department}</span>
                    </td>
                    <td>
                      <span className={`year-badge year-${student.year}`}>
                        Year {student.year}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => onView(student)}
                          className="btn-icon view"
                          title="View Student Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => onEdit(student)}
                          className="btn-icon edit"
                          title="Edit Student Information"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(student)}
                          className="btn-icon delete"
                          title="Delete Student Record"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* VIEW MODE: GRID CARDS */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {paginatedStudents.map((student) => {
            const isSelected = selectedIds.includes(student.id);
            return (
              <div
                key={student.id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  position: 'relative',
                  border: isSelected ? '1px solid var(--accent-primary)' : '',
                  background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-card)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div className="avatar-circle">{getInitials(student.name)}</div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{student.name}</h4>
                      <span className="student-id">#{student.id}</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectOne(student.id)}
                    style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', cursor: 'pointer', accentColor: '#6366f1' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <BookOpen size={14} className="text-accent" />
                    <span>{student.department}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Mail size={14} />
                    <span style={{ wordBreak: 'break-all' }}>{student.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Phone size={14} />
                    <span>{student.phone}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.85rem' }}>
                  <span className={`year-badge year-${student.year}`}>Year {student.year}</span>

                  <div className="table-actions">
                    <button onClick={() => onView(student)} className="btn-icon view" title="View Profile">
                      <Eye size={17} />
                    </button>
                    <button onClick={() => onEdit(student)} className="btn-icon edit" title="Edit Student">
                      <Edit3 size={17} />
                    </button>
                    <button onClick={() => onDelete(student)} className="btn-icon delete" title="Delete Student">
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1.5rem',
          padding: '0.85rem 1.25rem',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.25rem 0.5rem',
              fontSize: '0.85rem',
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value="ALL">Show All ({students.length})</option>
          </select>
        </div>

        {pageSize !== 'ALL' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Page {validPage} of {totalPages}
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                disabled={validPage <= 1}
                onClick={() => setCurrentPage(validPage - 1)}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.65rem' }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={validPage >= totalPages}
                onClick={() => setCurrentPage(validPage + 1)}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.65rem' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
