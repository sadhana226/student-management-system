import React from 'react';
import { Users, BookOpen, Calendar, Activity, Filter, CheckCircle2 } from 'lucide-react';

const DashboardStats = ({ students, activeDepartment, onSelectDepartment, activeYear, onSelectYear }) => {
  const totalCount = students.length;

  // Calculate unique departments & their counts
  const deptCounts = {};
  students.forEach((s) => {
    if (s.department) {
      deptCounts[s.department] = (deptCounts[s.department] || 0) + 1;
    }
  });

  const departmentList = Object.keys(deptCounts);
  const totalDeptCount = departmentList.length;

  // Year breakdown counts
  const yearCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  students.forEach((s) => {
    if (s.year >= 1 && s.year <= 4) {
      yearCounts[s.year] = (yearCounts[s.year] || 0) + 1;
    }
  });

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Metrics Cards Grid */}
      <div className="stats-grid" style={{ marginBottom: '1.25rem' }}>
        <div
          className="glass-card stat-card"
          onClick={() => { onSelectDepartment('ALL'); onSelectYear('ALL'); }}
          style={{ cursor: 'pointer', border: activeDepartment === 'ALL' && activeYear === 'ALL' ? '1px solid var(--accent-primary)' : '' }}
        >
          <div className="stat-icon-wrapper purple">
            <Users size={26} />
          </div>
          <div className="stat-info">
            <h3>Total Enrolled</h3>
            <div className="stat-value">{totalCount}</div>
            <p className="stat-desc">Click to reset all filters</p>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper cyan">
            <BookOpen size={26} />
          </div>
          <div className="stat-info">
            <h3>Active Depts</h3>
            <div className="stat-value">{totalDeptCount}</div>
            <p className="stat-desc">Academic programs</p>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper emerald">
            <Calendar size={26} />
          </div>
          <div className="stat-info">
            <h3>Final Year (Yr 4)</h3>
            <div className="stat-value">{yearCounts[4]}</div>
            <p className="stat-desc">Graduating batch</p>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper pink">
            <Activity size={26} />
          </div>
          <div className="stat-info">
            <h3>System Status</h3>
            <div className="stat-value" style={{ fontSize: '1.15rem', color: '#34d399' }}>
              ● REST Online
            </div>
            <p className="stat-desc">MySQL connected</p>
          </div>
        </div>
      </div>

      {/* Interactive Quick Filter Pills */}
      {totalCount > 0 && (
        <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <Filter size={15} />
            <span>INTERACTIVE QUICK FILTERS:</span>
            {(activeDepartment !== 'ALL' || activeYear !== 'ALL') && (
              <button
                onClick={() => { onSelectDepartment('ALL'); onSelectYear('ALL'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-primary)',
                  fontSize: '0.775rem',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  textDecoration: 'underline',
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {/* Department Pills */}
            <button
              onClick={() => onSelectDepartment('ALL')}
              className={`filter-pill ${activeDepartment === 'ALL' ? 'active' : ''}`}
            >
              All Departments ({totalCount})
            </button>
            {departmentList.map((dept) => (
              <button
                key={dept}
                onClick={() => onSelectDepartment(dept)}
                className={`filter-pill ${activeDepartment === dept ? 'active' : ''}`}
              >
                {dept} ({deptCounts[dept]})
              </button>
            ))}

            <div style={{ width: 1, height: 24, background: 'var(--border-color)', margin: '0 0.25rem' }} />

            {/* Year Pills */}
            {[1, 2, 3, 4].map((yr) => (
              <button
                key={yr}
                onClick={() => onSelectYear(yr.toString())}
                className={`filter-pill year-${yr} ${activeYear === yr.toString() ? 'active' : ''}`}
              >
                Year {yr} ({yearCounts[yr]})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
