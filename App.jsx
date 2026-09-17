import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import SearchBar from './components/SearchBar';
import StudentList from './components/StudentList';
import StudentFormModal from './components/StudentFormModal';
import StudentDetailModal from './components/StudentDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import NotificationToast from './components/NotificationToast';
import { studentService } from './services/studentService';
import { exportToCSV } from './utils/exportUtils';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Interactive Filter States
  const [activeDepartment, setActiveDepartment] = useState('ALL');
  const [activeYear, setActiveYear] = useState('ALL');

  // Interactive View Mode State (Table vs Grid Cards)
  const [viewMode, setViewMode] = useState('table');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Fetch students from Spring Boot REST API
  const fetchStudents = useCallback(async (keyword = '') => {
    setLoading(true);
    try {
      let data;
      if (keyword.trim()) {
        data = await studentService.searchStudents(keyword);
      } else {
        data = await studentService.getAllStudents();
      }
      setStudents(data);
    } catch (err) {
      console.error('API Fetch Error:', err);
      showToast('error', err.message || 'Failed to connect to backend server.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Handle Search Input Change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    fetchStudents(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchStudents('');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchStudents(searchTerm);
  };

  // Seed Demo Data
  const handleSeedDemoData = async () => {
    setIsSeeding(true);
    try {
      const created = await studentService.seedDemoStudents();
      showToast('success', `Added ${created.length} sample student records into MySQL database!`);
      fetchStudents(searchTerm);
    } catch (err) {
      showToast('error', err.message || 'Failed to seed sample data.');
    } finally {
      setIsSeeding(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!students.length) return;
    exportToCSV(filteredStudents, `students_export_${new Date().toISOString().slice(0,10)}.csv`);
    showToast('info', `Exported ${filteredStudents.length} student records to CSV spreadsheet.`);
  };

  const handleExportSelected = (selectedStudents) => {
    if (!selectedStudents.length) return;
    exportToCSV(selectedStudents, `selected_students_${new Date().toISOString().slice(0,10)}.csv`);
    showToast('info', `Exported ${selectedStudents.length} selected student records to CSV.`);
  };

  // Toggle View Mode
  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === 'table' ? 'grid' : 'table'));
  };

  // Open Modal Helpers
  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setIsFormModalOpen(true);
  };

  const handleOpenViewModal = async (student) => {
    try {
      const freshData = await studentService.getStudentById(student.id);
      setViewingStudent(freshData);
    } catch (err) {
      setViewingStudent(student);
    }
    setIsDetailModalOpen(true);
  };

  const handleOpenDeleteModal = (student) => {
    setDeletingStudent(student);
    setIsDeleteModalOpen(true);
  };

  // CRUD Operations
  const handleFormSubmit = async (formData, studentId) => {
    try {
      if (studentId) {
        const updated = await studentService.updateStudent(studentId, formData);
        showToast('success', `Student "${updated.name}" updated successfully!`);
      } else {
        const created = await studentService.createStudent(formData);
        showToast('success', `Student "${created.name}" created successfully!`);
      }
      fetchStudents(searchTerm);
    } catch (err) {
      showToast('error', err.message || 'Operation failed. Please try again.');
      throw err;
    }
  };

  const handleDeleteConfirm = async (studentId) => {
    try {
      await studentService.deleteStudent(studentId);
      showToast('success', `Student record #${studentId} deleted successfully.`);
      fetchStudents(searchTerm);
    } catch (err) {
      showToast('error', err.message || 'Failed to delete student.');
      throw err;
    }
  };

  const handleBatchDelete = async (selectedIds) => {
    try {
      await studentService.deleteMultipleStudents(selectedIds);
      showToast('success', `Batch deleted ${selectedIds.length} student records.`);
      fetchStudents(searchTerm);
    } catch (err) {
      showToast('error', err.message || 'Failed to delete selected students.');
    }
  };

  // Apply Department and Year filters locally
  const filteredStudents = students.filter((s) => {
    if (activeDepartment !== 'ALL' && s.department !== activeDepartment) {
      return false;
    }
    if (activeYear !== 'ALL' && s.year !== Number(activeYear)) {
      return false;
    }
    return true;
  });

  return (
    <div className="app-layout">
      {/* Header / Navbar */}
      <Navbar
        totalStudents={students.length}
        onOpenAddModal={handleOpenAddModal}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onSeedDemoData={handleSeedDemoData}
        isSeeding={isSeeding}
        onExportCSV={handleExportCSV}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      {/* Main Content Body */}
      <main className="main-content">
        {/* Statistics Dashboard with Interactive Filter Pills */}
        <DashboardStats
          students={students}
          activeDepartment={activeDepartment}
          onSelectDepartment={setActiveDepartment}
          activeYear={activeYear}
          onSelectYear={setActiveYear}
        />

        {/* Controls Bar: Search & Actions */}
        <div className="controls-bar">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            totalMatches={filteredStudents.length}
            isFiltered={activeDepartment !== 'ALL' || activeYear !== 'ALL'}
          />
        </div>

        {/* Student Data List / Table / Grid */}
        <StudentList
          students={filteredStudents}
          loading={loading}
          onView={handleOpenViewModal}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          onBatchDelete={handleBatchDelete}
          onExportSelected={handleExportSelected}
          searchTerm={searchTerm}
          viewMode={viewMode}
        />
      </main>

      {/* Modals */}
      <StudentFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingStudent}
      />

      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        student={viewingStudent}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        student={deletingStudent}
      />

      {/* Toast Feedback */}
      <NotificationToast toast={toast} onClose={closeToast} />

      {/* Footer */}
      <footer className="footer">
        <p>Student Management System &copy; 2026. Built with Spring Boot 3, React 18 & MySQL.</p>
      </footer>
    </div>
  );
}

export default App;
