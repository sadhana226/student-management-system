// CSV Export Utility
export const exportToCSV = (data, filename = 'students_export.csv') => {
  if (!data || !data.length) return;

  const headers = ['ID', 'Full Name', 'Email Address', 'Phone Number', 'Department', 'Academic Year', 'Date of Birth', 'Address'];
  
  const csvRows = [];
  csvRows.push(headers.join(','));

  data.forEach((item) => {
    const values = [
      item.id,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${(item.email || '').replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${(item.department || '').replace(/"/g, '""')}"`,
      item.year,
      `"${item.dateOfBirth || ''}"`,
      `"${(item.address || '').replace(/"/g, '""')}"`,
    ];
    csvRows.push(values.join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// JSON Export Utility
export const exportToJSON = (data, filename = 'students_data.json') => {
  if (!data || !data.length) return;

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.removeChild(downloadAnchor);
};
