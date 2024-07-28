# AskMateOOP Project

## Overview
AskMateOOP is a web application that allows users to post questions and answers, as well as create user accounts, wich is currently still at a rudimentary level. The project is built with a Spring Boot backend and a React.js frontend. 

## Table of Contents
- [Technologies Used](#technologies-used).
- [Setup & installation](#setup--installation)
- [Acknowledgments](#Acknowledgments)
- [Future Features](#future-features)
- [Contributing](#contributing)

## Technologies Used
* Backend: Spring Boot, Java
* Frontend: React.js
* Database: PostgreSQL


## Setup & installation
### Prerequisites
* JDK 11 or higher
* Maven
* PostgreSQL
* Node.js
* npm


1. **Clone the repository:**
    ```bash
    git clone https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-arvamartin
    ```
2. **Navigate to the project directory**

3. **Install dependencies for frontend**:
   
   ```bash
   cd frontend
   ```
   ```bash
   cd vite
   ```
   ```bash
   npm install
   ```

4. **Set up environment variables for your own database:**
* DATABASE_USERNAME
* DATABASE_PASSWORD
* DATABASE_URL

**Database schema (query console)**:
    
    CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES question(id),
    description TEXT NOT NULL
    );

    CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    );
    

5. **Run the project:**
    - **Start the server:**
    run the **AskMateOOPApplication**

     - **Start the client:**
      ```bash
      cd frontend
      ```
      ```bash
      cd vite
      ```
      ```bash
      npm run dev
      ```
6. **Open the application in your web browser:**


## Acknowledgments

- [PostgreSQL](https://www.postgresql.org/) for the database.
- Spring Boot for the backend framework.
- [React](https://reactjs.org/) for the frontend library.
- [Node.js](https://nodejs.org/) for the runtime environment.

## Future Features
* Improve the design of the application
* Enhance user experience and interface
* Add user profile management and customization options

## Contributing
* Fork the repository.
* Create a new branch (git checkout -b feature/your-feature-name).
* Commit your changes (git commit -am 'Add some feature').
* Push to the branch (git push origin feature/your-feature-name).
* Create a new Pull Request.