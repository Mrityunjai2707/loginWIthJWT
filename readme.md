# JWT Authentication with React, Node.js, and MongoDB

## Overview
This project implements JWT (JSON Web Token) authentication in a full-stack application using React.js for the frontend, Node.js for the backend, and MongoDB for the database. JWT authentication provides a secure way to authenticate users and authorize access to protected routes.

## Features
- User signup with validation
- User login with validation
- Password encryption using bcrypt
- Token generation and verification with JWT
- Protected routes for authenticated users

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Encryption**: bcrypt
- **Validation**: Validator.js

## Setup Instructions
1. Clone the repository from GitHub.
2. Install dependencies for both frontend and backend using `npm install` in the respective directories.
3. Set up MongoDB database and update the connection URI in the backend.
4. Create a `.env` file in the backend directory and add environment variables for JWT_SECRET, JWT_EXPIRES_IN, and JWT_COOKIE_EXPIRES_IN.
5. Run the backend server using `npm start` or `node server.js`.
6. Run the frontend server using `npm start`.
7. Access the application in your browser at `http://localhost:3000`.

## Usage
1. Signup: Provide name, email, and password. Password should be at least 8 characters long. Confirm the password.
2. Login: Provide registered email and password to log in.
3. Protected Routes: Access protected routes after successful login.
4. Logout: Clear authentication token and log out.

## Folder Structure
- **backend**: Contains backend Node.js code.
  - **controllers**: Contains controller functions for authentication.
  - **models**: Defines MongoDB schemas for user data.
  - **routes**: Defines API routes for user authentication.
  - **middlewares**: Contains middleware functions for error handling and authentication.
  - **server.js**: Entry point for the backend server.
  - **frontend**: Contains frontend React.js code.
  - **src/components**: Contains React components for signup, login, and other views.
  - **src/utils**: Utility functions for making API requests and handling responses.
  - **src/App.js**: Main component for routing and managing state.


## Acknowledgments
- https://nodejs.org/
- https://reactjs.org/
- https://expressjs.com/
- https://www.mongodb.com/
- https://jwt.io/
- https://www.npmjs.com/package/bcrypt
- https://github.com/validatorjs/validator.js

Feel free to customize this README according to your project's specific details and requirements.
