# AskMateOOP Project

## Overview
AskMateOOP is a web application for posting questions and answers, featuring user account creation. Currently, it is at a rudimentary level of development. The project utilizes a Spring Boot backend and a React.js frontend.

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
    git clone https://github.com/CodecoolGlobal/ask-mate-oop-java-arvamartin
    ```
2. **Navigate to the project directory**

3. **Install dependencies for frontend**:
   
   ```bash
   cd frontend/vite
   ```
   ```bash
   npm install
   ```

4. **Set up environment variables for your own database:**
* DATABASE_USERNAME
* DATABASE_PASSWORD
* DATABASE_URL

**Configuration**:
-   For the Spring Boot application to connect to your PostgreSQL database, you'll need to configure the database settings in the application.properties file. Here's a sample configuration for application.properties:
* spring.datasource.url=${DATABASE_URL}
* spring.datasource.username=${DATABASE_USERNAME}
* spring.datasource.password=${DATABASE_PASSWORD}
* spring.datasource.driver-class-name=org.postgresql.Driver
* spring.jpa.hibernate.ddl-auto=update
* spring.jpa.show-sql=true
    

5. **Run the project:**
    - **Start the server:**
    run the **AskMateOOPApplication**

     - **Start the client:**
      ```bash
      cd frontend/vite
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