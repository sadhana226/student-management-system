# Student Management System 🎓

A full-stack CRUD web application built with **Spring Boot 3**, **React.js**, **MySQL**, and **Spring Data JPA/Hibernate**.

---

## 🌟 Key Features

1. **Create Student**: Add new student with full server-side & client-side validation.
2. **View All Students**: Interactive dashboard displaying student tables, stats, and department distributions.
3. **View Single Student**: Detailed profile modal with full details.
4. **Update Student**: Edit existing student records with unique email check.
5. **Delete Student**: Confirm & remove student records permanently.
6. **Search Students**: Real-time multi-field search (by Name, Email, Department, Phone).
7. **Validation & Error Handling**: Jakarta Bean Validation on backend + form validation on frontend with instant visual feedback.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (v18), Vite, Lucide Icons, Axios, CSS3 Glassmorphism |
| **Backend** | Spring Boot (v3.2), Java 17 |
| **Database** | MySQL (Database: `student_management`) |
| **ORM** | Spring Data JPA / Hibernate |
| **Architecture** | Controller → Service → Repository → Model |
| **API Format** | RESTful JSON APIs |
| **API Testing** | Postman Collection (`Student_Management_System.postman_collection.json`) |

---

## 📁 Project Directory Structure

```
student-management-system/
├── backend/                                # Spring Boot Application
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/student/management/
│       │   │   ├── controller/
│       │   │   │   └── StudentController.java
│       │   │   ├── service/
│       │   │   │   ├── StudentService.java
│       │   │   │   └── StudentServiceImpl.java
│       │   │   ├── repository/
│       │   │   │   └── StudentRepository.java
│       │   │   ├── model/
│       │   │   │   └── Student.java
│       │   │   ├── exception/
│       │   │   │   ├── StudentNotFoundException.java
│       │   │   │   ├── EmailAlreadyExistsException.java
│       │   │   │   ├── ErrorDetails.java
│       │   │   │   └── GlobalExceptionHandler.java
│       │   │   └── StudentManagementApplication.java
│       │   └── resources/
│       │       └── application.properties
├── frontend/                               # React.js Vite Application
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── DashboardStats.jsx
│       │   ├── SearchBar.jsx
│       │   ├── StudentList.jsx
│       │   ├── StudentFormModal.jsx
│       │   ├── StudentDetailModal.jsx
│       │   ├── DeleteConfirmModal.jsx
│       │   └── NotificationToast.jsx
│       ├── services/
│       │   └── studentService.js
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── Student_Management_System.postman_collection.json
└── README.md
```

---

## 🚀 Setup & Execution Guide

### Step 1: Database Setup (MySQL)

1. Ensure MySQL Server is installed and running on `localhost:3306`.
2. Open MySQL Workbench or MySQL Command Line Client and execute:
   ```sql
   CREATE DATABASE student_management;
   ```
3. Open `backend/src/main/resources/application.properties` and update your MySQL credentials:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

---

### Step 2: Running the Spring Boot Backend

#### Option A: Using IDE (IntelliJ IDEA / Eclipse / VS Code)
1. Open the `backend` directory in your Java IDE.
2. Locate `StudentManagementApplication.java` at `src/main/java/com/student/management/StudentManagementApplication.java`.
3. Right-click and select **Run Application** (or press Shift+F10 / F5).
4. The backend server will start on `http://localhost:8080`.

#### Option B: Using Command Line (Maven)
```bash
cd backend
mvn spring-boot:run
```

---

### Step 3: Running the React Frontend

1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`.

---

## 📡 REST API Endpoint Documentation

| Method | Endpoint | Description | Expected Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/students` | Create new student | `201 Created` |
| `GET` | `/api/students` | Fetch all students | `200 OK` |
| `GET` | `/api/students/{id}` | Fetch student by ID | `200 OK` / `404 Not Found` |
| `PUT` | `/api/students/{id}` | Update student details | `200 OK` / `400 Bad Request` / `409 Conflict` |
| `DELETE` | `/api/students/{id}` | Delete student record | `200 OK` |
| `GET` | `/api/students/search?keyword=...` | Search students | `200 OK` |

---

## 🧪 Testing with Postman

1. Open Postman.
2. Click **Import** in top left corner.
3. Select the file `Student_Management_System.postman_collection.json` located in the root directory.
4. Execute the ready-to-use API requests for POST, GET, PUT, DELETE, and Search.

---

## 🎓 Viva Presentation Tips

1. **Architecture Explanation**:
   - Highlight the **MVC / Controller-Service-Repository** pattern.
   - **Controller** handles HTTP endpoints & DTO validation.
   - **Service** encapsulates business logic (e.g. duplicate email prevention).
   - **Repository** handles DB interaction using Spring Data JPA.
   - **React Frontend** consumes REST APIs asynchronously using Axios.
2. **Database Auto DDL**: Explain `spring.jpa.hibernate.ddl-auto=update`, which automatically generates table schemas from `@Entity` annotations in `Student.java`.
3. **Exception Handling**: Demonstrate how `@ControllerAdvice` maps custom exceptions (`StudentNotFoundException`, `EmailAlreadyExistsException`, `@Valid` errors) to clean HTTP status codes (400, 404, 409).
