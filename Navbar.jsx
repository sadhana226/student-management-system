import React from 'react';
import {
  GraduationCap,
  PlusCircle,
  RefreshCw,
  Layers,
  Sparkles,
  Download,
  LayoutGrid,
  Table,
} from 'lucide-react';

const Navbar = ({
  totalStudents,
  onOpenAddModal,
  onRefresh,
  isRefreshing,
  onSeedDemoData,
  isSeeding,
  onExportCSV,
  viewMode,
  onToggleViewMode,
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="brand-logo">
          <div className="logo-icon">
            <GraduationCap size={24} />
          </div>
          <div className="brand-text">
            <h1>EduPulse Admin</h1>
            <p>Interactive Student Portal</p>
          </div>
        </a>

        <div className="nav-actions">
          {/* Total Counter Badge */}
          <div className="badge-counter" title="Total Active Students">
            <Layers size={16} />
            <span>{totalStudents} {totalStudents === 1 ? 'Student' : 'Students'}</span>
          </div>

          {/* Toggle View Mode: Table vs Grid */}
          <button
            onClick={onToggleViewMode}
            className="btn btn-secondary"
            title={viewMode === 'table' ? 'Switch to Grid Cards View' : 'Switch to Table View'}
            style={{ padding: '0.6rem 0.85rem' }}
          >
            {viewMode === 'table' ? <LayoutGrid size={17} /> : <Table size={17} />}
          </button>

          {/* Seed Demo Data Button */}
          <button
            onClick={onSeedDemoData}
            className="btn btn-secondary"
            title="Populate database with sample student records"
            disabled={isSeeding}
            style={{ padding: '0.6rem 0.9rem', color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.3)' }}
          >
            <Sparkles size={16} className={isSeeding ? 'spinner' : ''} />
            <span>{isSeeding ? 'Seeding...' : 'Demo Data'}</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={onExportCSV}
            className="btn btn-secondary"
            title="Export student records to CSV spreadsheet"
            disabled={totalStudents === 0}
            style={{ padding: '0.6rem 0.9rem' }}
          >
            <Download size={16} />
            <span>Export</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="btn btn-secondary"
            title="Refresh database records"
            disabled={isRefreshing}
            style={{ padding: '0.6rem 0.85rem' }}
          >
            <RefreshCw size={16} className={isRefreshing ? 'spinner' : ''} />
          </button>

          {/* Add Student Button */}
          <button onClick={onOpenAddModal} className="btn btn-primary">
            <PlusCircle size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
