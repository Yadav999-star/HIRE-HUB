# Placement Management System Backend

A Node.js, Express, and MongoDB backend for a Placement Management System.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Set up MongoDB:
   - Install MongoDB on your system or use MongoDB Atlas
   - Update the connection string in the `.env` file if needed

3. Start the server:
   ```
   npm start
   ```
   
   For development with automatic restarts:
   ```
   npm run dev
   ```

## API Endpoints

### Register a Student
- **URL**: `/api/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "specialization": "Computer Science",
    "cgpa": 8.5
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "message": "Student registered successfully",
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "specialization": "Computer Science",
      "cgpa": 8.5,
      "_id": "60f7a8b4e6c1234567890123",
      "createdAt": "2023-07-21T10:15:32.123Z",
      "updatedAt": "2023-07-21T10:15:32.123Z"
    }
  }
  ```

### Get Students (with optional filtering)
- **URL**: `/api/students`
- **Method**: `GET`
- **Query Parameters**: 
  - `specialization` (optional): Filter students by specialization
- **Example**: `/api/students?specialization=Computer Science`
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "60f7a8b4e6c1234567890123",
        "name": "John Doe",
        "email": "john@example.com",
        "specialization": "Computer Science",
        "cgpa": 8.5,
        "createdAt": "2023-07-21T10:15:32.123Z",
        "updatedAt": "2023-07-21T10:15:32.123Z"
      }
    ]
  }
  ```

## Testing with Postman

1. **Register a Student**:
   - Open Postman
   - Set method to `POST`
   - Enter URL: `http://localhost:5000/api/register`
   - Go to Body tab, select "raw" and "JSON"
   - Enter the JSON body with student details
   - Click Send

2. **Get All Students**:
   - Set method to `GET`
   - Enter URL: `http://localhost:5000/api/students`
   - Click Send

3. **Filter Students by Specialization**:
   - Set method to `GET`
   - Enter URL: `http://localhost:5000/api/students?specialization=Computer Science`
   - Click Send

## Testing with Frontend Fetch

### Register a Student:
```javascript
const registerStudent = async (studentData) => {
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to register student');
    }
    
    return data;
  } catch (error) {
    console.error('Error registering student:', error);
    throw error;
  }
};

// Example usage
const newStudent = {
  name: "Jane Smith",
  email: "jane@example.com",
  specialization: "Information Technology",
  cgpa: 9.2
};

registerStudent(newStudent)
  .then(data => console.log('Registration successful:', data))
  .catch(error => console.error('Registration failed:', error));
```

### Get Students (with optional filtering):
```javascript
const getStudents = async (specialization = null) => {
  try {
    let url = 'http://localhost:5000/api/students';
    
    if (specialization) {
      url += `?specialization=${encodeURIComponent(specialization)}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch students');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Example usage - get all students
getStudents()
  .then(data => console.log('All students:', data))
  .catch(error => console.error('Fetch failed:', error));

// Example usage - get filtered students
getStudents('Computer Science')
  .then(data => console.log('CS students:', data))
  .catch(error => console.error('Fetch failed:', error));

``` 
