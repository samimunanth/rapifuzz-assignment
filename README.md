# Assignment
# Incident Management System

## Assignment

You are tasked with creating a REST API for an incident management system with the following specifications:

### Development Environment

- **Operating System:** Ubuntu (Version 18 & above)
- **Programming Language:** Python 3.8 and above
- **Database:** MySQL (preferred) or PostgreSQL
- **Front-End:** React.JS or any front-end language. If not familiar with front-end development, you can use Postman for demonstration.

### Front-End Development

Develop the following pages using ReactJS or any front-end language of your choice:

1. **Registration Page**
   - Design based on the provided mockup (`registration.png`).

2. **Login Page**
   - Design based on the provided mockup (`login.png`).

3. **Forgot Password Page**
   - Design based on the provided mockup (`forgot_password.png`).

4. **Incident Management Page**
   - Create, view, and edit incidents using your own UI. Refer to the backend section for input requirements.

### Back-End Development

Develop the back-end using Python and Django Rest Framework. Key functionalities include:

1. **User Management**
   - Allow the creation of multiple users.
   - Each user should have the following details:
     - User Name
     - User Email ID
     - User Phone Number
     - User Address, Pin code
     - Auto-select City and Country based on the pin code (use a library or API for this).

2. **Incident Management**
   - Allow users to create multiple incidents.
   - Each incident should have:
     - **Identification**: Enterprise or Government
     - **Reporter Details**: Auto-fill previous information if the reporter exists
     - **Incident ID**: Format `RMG` + Random 5-digit number + Current year (e.g., `RMG345712022`)
     - **Unique Incident Number**: Ensure each Incident ID is unique
     - **Details**:
       - Reporter Name (Name of the user who logs in and creates the incident)
       - Incident Details (Text field, editable)
       - Incident Reported Date and Time
       - Priority (Dropdown: High, Medium, Low, editable)
       - Incident Status (Open, In Progress, Closed, editable)
     - **Limitations**:
       - Users can view and edit only their own incidents.
       - Users cannot view other users’ incidents.
       - Incidents with status "Closed" should not be editable.
       - Provision to search incidents using Incident ID.

### Getting Started

1. **Set Up Environment**
   - Install required software and dependencies.
   - Set up a Python virtual environment.
   - Install Django and Django Rest Framework.
   - Set up the database (MySQL or PostgreSQL).

2. **Database Configuration**
   - Configure the database connection in Django settings.
   - Create necessary models and migrations.

3. **Develop Front-End**
   - Implement the user interface based on provided designs.
   - Connect the front-end with the back-end API.

4. **Develop Back-End**
   - Implement user registration, login, and incident management endpoints.
   - Ensure all API endpoints are secure and functional.

5. **Testing**
   - Test the API endpoints using Postman or any other API testing tool.
   - Verify that all functionalities work as expected.

### Notes

- Ensure code quality and maintainability.
- Document any additional configurations or setup instructions.
- Follow best practices for both front-end and back-end development.

---

Feel free to modify or extend this documentation as needed.

