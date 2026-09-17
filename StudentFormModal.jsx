import React, { useState, useEffect } from 'react';
import { X, UserPlus, Edit3, AlertCircle } from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical & Electronics',
  'Mechanical Engineering',
  'Civil Engineering',
  'Data Science & AI',
  'Business Administration',
];

const StudentFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const isEdit = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: 1,
    dateOfBirth: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        department: initialData.department || DEPARTMENTS[0],
        year: initialData.year || 1,
        dateOfBirth: initialData.dateOfBirth || '',
        address: initialData.address || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: DEPARTMENTS[0],
        year: 1,
        dateOfBirth: '',
        address: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' ? Number(value) : value,
    }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Student name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. alex@example.com)';
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (digits, spaces, or dashes)';
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = 'Department selection is required';
    }

    // Year validation (1 - 4)
    const yearNum = Number(formData.year);
    if (!yearNum || yearNum < 1 || yearNum > 4) {
      newErrors.year = 'Academic year must be between 1 and 4';
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const selectedDate = new Date(formData.dateOfBirth);
      const today = new Date();
      if (selectedDate >= today) {
        newErrors.dateOfBirth = 'Date of birth must be a past date';
      }
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Residential address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await onSubmit(formData, initialData?.id);
      onClose();
    } catch (err) {
      // Backend error will be caught and passed from App
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            {isEdit ? <Edit3 size={22} className="text-accent" /> : <UserPlus size={22} className="text-accent" />}
            <span>{isEdit ? 'Edit Student Details' : 'Register New Student'}</span>
          </div>
          <button className="btn-icon" onClick={onClose} title="Close Modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group full-width">
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? 'error' : ''}`}
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="error-text">
                    <AlertCircle size={14} /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  placeholder="jane.doe@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="error-text">
                    <AlertCircle size={14} /> {errors.email}
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control ${errors.phone ? 'error' : ''}`}
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <span className="error-text">
                    <AlertCircle size={14} /> {errors.phone}
                  </span>
                )}
              </div>

              {/* Department */}
              <div className="form-group">
                <label className="form-label">
                  Department <span className="required">*</span>
                </label>
                <select
                  name="department"
                  className={`form-control ${errors.department ? 'error' : ''}`}
                  value={formData.department}
                  onChange={handleChange}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <span className="error-text">
                    <AlertCircle size={14} /> {errors.department}
                  </span>
                )}
              </div>

              {/* Year */}
              <div className="form-group">
                <label className="form-label">
                  Academic Year <span className="required">*</span>
                </label>
                <select
                  name="year"
                  className={`form-control ${errors.year ? 'error' : ''}`}
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value={1}>Year 1 (Freshman)</option>
                  <option value={2}>Year 2 (Sophomore)</option>
                  <option value={3}>Year 3 (Junior)</option>
                  <option value={4}>Year 4 (Senior)</option>
                </select>
                {errors.year && (
                  <span className="error-text">
                    <AlertCircle size={14} /> {errors.year}
                  </span>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-group full-width">
                <label className="form-label">
                  Date of Birth <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className={`form-control ${errors.dateOfBirth ? 'error' : ''}`}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                {errors.dateOfBirth && (
                  <span className="error-text">
                    <AlertCircle size={14} /> {errors.dateOfBirth}
                  </span>
                )}
              </div>

              {/* Residential Address */}
              <div className="form-group full-width">
                <label className="form-label">
                  Residential Address <span className="required">*</span>
                </label>
                <textarea
                  name="address"
                  rows="3"
                  className={`form-control ${errors.address ? 'error' : ''}`}
                  placeholder="Enter full campus or residential address"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
                {errors.address && (
                  <span className="error-text">
                    <AlertCircle size={14} /> {errors.address}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                  Saving...
                </>
              ) : isEdit ? (
                'Update Student'
              ) : (
                'Save Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
