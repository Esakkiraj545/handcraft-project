# Handcraft E-commerce Application

A full-stack premium e-commerce platform built with React, Node.js, MongoDB, and Tailwind CSS.

## Features

- **Auth**: JWT-based Authentication (Login, Register, Profile).
- **Products**: CRUD operations, categorized listings, and detail views.
- **Cart**: Local persistence with Redux Toolkit.
- **Orders**: Order lifecycle management (to be fully integrated with payment).
- **Admin**: Dashboard for managing users and products.
- **Design**: Modern, responsive UI with Glassmorphism and animations.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Redux Toolkit, Axios, Lucide React.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Express Validator.

## Getting Started

### Prerequisites

- Node.js installed.
- MongoDB running locally or a MongoDB Atlas URI.

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd handcraft-ecommerce
   ```

2. **Setup Server**:
   ```bash
   cd server
   npm install
   # Create .env file based on the provided one
   npm run dev # Starts with nodemon (ensure you add "dev": "nodemon src/server.js" to package.json)
   ```

3. **Setup Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Folder Structure

- `client/`: React application.
- `server/`: Express API.

## Scripts to add to package.json

In `server/package.json`:
```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```
