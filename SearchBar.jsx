import React, { useEffect, useRef } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, totalMatches, isFiltered }) => {
  const inputRef = useRef(null);

  // Keyboard shortcut listener ('/' key focuses search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '100%' }}>
      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search by student name, email, department, or phone... (Press '/' to focus)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={onClearSearch}
            className="search-clear"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          whiteSpace: 'nowrap',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '0.6rem 0.9rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
        }}
      >
        <SlidersHorizontal size={15} />
        <span>
          Showing <strong>{totalMatches}</strong> {totalMatches === 1 ? 'record' : 'records'}
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
