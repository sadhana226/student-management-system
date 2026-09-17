import axios from 'axios';

// Base URL for Spring Boot REST API
const API_BASE_URL = 'http://localhost:8080/api/students';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Sample seed data to populate database with 1 click
export const SAMPLE_STUDENTS = [
  {
    name: 'Alexander Wright',
    email: 'alex.wright@university.edu',
    phone: '+1 (555) 234-5678',
    department: 'Computer Science & Engineering',
    year: 3,
    dateOfBirth: '2003-04-12',
    address: '402 Innovation Hall, Campus West, Cityville',
  },
  {
    name: 'Sophia Martinez',
    email: 'sophia.m@university.edu',
    phone: '+1 (555) 345-6789',
    department: 'Data Science & AI',
    year: 4,
    dateOfBirth: '2002-09-25',
    address: '108 Turing Block, Tech Quarter, Cityville',
  },
  {
    name: 'Marcus Chen',
    email: 'marcus.chen@university.edu',
    phone: '+1 (555) 456-7890',
    department: 'Electronics & Communication',
    year: 2,
    dateOfBirth: '2004-11-08',
    address: '204 Tesla Tower, Science Park, Cityville',
  },
  {
    name: 'Emily Watson',
    email: 'emily.w@university.edu',
    phone: '+1 (555) 567-8901',
    department: 'Information Technology',
    year: 1,
    dateOfBirth: '2005-01-30',
    address: '501 Freshman Quad, Residence East, Cityville',
  },
  {
    name: 'David Miller',
    email: 'david.miller@university.edu',
    phone: '+1 (555) 678-9012',
    department: 'Mechanical Engineering',
    year: 4,
    dateOfBirth: '2002-06-18',
    address: '309 Engineering Block B, North Campus, Cityville',
  },
];

export const studentService = {
  // Get all students
  getAllStudents: async () => {
    try {
      const response = await apiClient.get('');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get single student by ID
  getStudentById: async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Create new student
  createStudent: async (studentData) => {
    try {
      const response = await apiClient.post('', studentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update student by ID
  updateStudent: async (id, studentData) => {
    try {
      const response = await apiClient.put(`/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete student by ID
  deleteStudent: async (id) => {
    try {
      const response = await apiClient.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete multiple students (Batch delete)
  deleteMultipleStudents: async (ids) => {
    try {
      const results = await Promise.allSettled(
        ids.map((id) => apiClient.delete(`/${id}`))
      );
      const failures = results.filter((r) => r.status === 'rejected');
      if (failures.length > 0) {
        throw new Error(`Failed to delete ${failures.length} student records.`);
      }
      return true;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Search students by keyword
  searchStudents: async (keyword) => {
    try {
      const response = await apiClient.get('/search', {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Seed realistic demo students into database
  seedDemoStudents: async () => {
    try {
      const created = [];
      for (const sample of SAMPLE_STUDENTS) {
        try {
          const res = await apiClient.post('', sample);
          created.push(res.data);
        } catch (err) {
          // Ignore duplicates if already present
        }
      }
      return created;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

function handleApiError(error) {
  if (error.response) {
    const data = error.response.data;
    if (data && data.errors) {
      const errorMessages = Object.values(data.errors).join(' | ');
      return new Error(errorMessages);
    }
    return new Error(data.message || `Server error: ${error.response.status}`);
  } else if (error.request) {
    return new Error('Unable to connect to Spring Boot backend server. Please verify server is running on http://localhost:8080');
  } else {
    return new Error(error.message || 'An unexpected error occurred');
  }
}
