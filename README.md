# MERN Stack Package Tracker Application

This is a take-home project that demonstrates a MERN (MongoDB, Express, React, Node.js) stack application for tracking deliveries and packages. The application provides CRUD operations for managing deliveries, packages, and tracking.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication and Authorization](#authentication-and-authorization)
- [Screenshots](#screenshots)


## Features

- User authentication and authorization using JWT
- Create, Read, Update, and Delete (CRUD) operations for Deliveries and Packages
- Real-time tracking of packages and driver postion update

## Technologies Used

- MongoDB: NoSQL database for storing data
- Express: Web framework for Node.js
- React: Front-end library for building user interfaces
- Node.js: JavaScript runtime for server-side development
- JWT: JSON Web Token for securing APIs
- Mongoose: ODM for MongoDB and Node.js

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/sergelawson/p-tracker-th.git
    cd p-tracker-th
    ```

2. Install server dependencies:
    ```sh
    cd server
    pnpm install
    ```

3. Install client dependencies:
    ```sh
    cd ../frontend
    pnpm install
    ```

4. Create a `.env` file in the `server` directory and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret
    ```

5. Start the development server:
    ```sh
    cd ../server
    pnpm run dev
    ```

6. Start the client development server:
    ```sh
    cd ../frontend
    pnpm run dev
    ```

## Usage

1. Use the dashboard to create, view, update, and delete deliveries and packages.
2. Track packages in real-time through the tracking interface.
3. Driver in real-time through the tracking interface.

## API Endpoints

### Authentication

- `POST /api/users`: Register a new user
- `POST /api/sessions`: Log in a user

### Deliveries

- `GET /api/delivery`: Get all deliveries
- `GET /api/delivery/:id`: Get a delivery by ID
- `POST /api/delivery`: Create a new delivery
- `PUT /api/delivery/:id`: Update a delivery
- `DELETE /api/delivery/:id`: Delete a delivery

### Packages

- `GET /api/package`: Get all packages
- `GET /api/package/:id`: Get a package by ID
- `POST /api/package`: Create a new package
- `PUT /api/package/:id`: Update a package
- `DELETE /api/package/:id`: Delete a package

## Authentication and Authorization

The application uses JWT (JSON Web Token) for securing API endpoints. Users must log in to obtain a token, which must be included in the `Authorization` header of subsequent requests.

Example:
```sh
Authorization: Bearer your_jwt_token
