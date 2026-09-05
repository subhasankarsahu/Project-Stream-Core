# StreamCore

StreamCore is a full-stack video sharing platform built to explore and implement modern web application architecture. The project focuses primarily on backend engineering concepts such as authentication, authorization, media handling, API design, database relationships, and scalable application structure, while also providing a complete React-based frontend experience.

The goal of this project was to move beyond tutorial-level CRUD applications and gain hands-on experience building a production-style backend system with real-world patterns and workflows.

---

## Overview

StreamCore provides the core functionality expected from a modern video platform:

* User authentication and account management
* Video upload and management
* Channel subscriptions
* Comments and likes
* Playlists
* User activity tracking
* Creator dashboard and analytics
* Media storage and delivery

The application follows a modular architecture with a clear separation of concerns between routes, controllers, middleware, services, and data models.

---

## Key Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Access and refresh token flow
* Protected routes
* Secure cookie handling
* Password management
* Current user sessions

### User Management

* Profile management
* Avatar uploads
* Cover image uploads
* Watch history tracking
* Channel profile pages

### Video Platform

* Video publishing
* Thumbnail management
* Video updates and deletion
* Publish/unpublish functionality
* Video browsing and discovery
* Channel-specific content

### Community Features

* Video likes
* Comment likes
* Tweet likes
* Video comments
* Creator subscriptions
* User engagement tracking

### Playlists

* Create playlists
* Update playlists
* Delete playlists
* Add videos to playlists
* Remove videos from playlists

### Dashboard

* Channel statistics
* Subscriber counts
* Video analytics
* Creator activity overview

### Media Handling

* Cloudinary integration
* Multer-based file uploads
* Image processing workflow
* Video asset management

---

## Technology Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Tokens (JWT)
* Refresh Token Strategy
* Cookie-based Authentication

### Media Storage

* Cloudinary
* Multer

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* TanStack Query

### Additional Tools

* bcrypt
* cookie-parser
* cors
* dotenv

---

## Architecture

The project follows a layered backend architecture:

```text
Client
   │
   ▼
Routes
   │
   ▼
Middlewares
   │
   ▼
Controllers
   │
   ▼
Models
   │
   ▼
MongoDB
```

Authentication, file uploads, request validation, error handling, and API responses are implemented using reusable middleware and utility layers.

---

## Project Structure

```text
src/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── db/
│
├── app.js
└── index.js
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=

MONGODB_URI=

CORS_ORIGIN=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/subhasankarsahu/Project-Stream-Core.git
```

Move into the project directory:

```bash
cd Project-Stream-Core
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

---

## API Modules

The backend is organized into the following modules:

* Users
* Authentication
* Videos
* Comments
* Likes
* Subscriptions
* Playlists
* Tweets
* Dashboard
* Healthcheck

All APIs are versioned under:

```text
/api/v1
```

---

## Frontend

The frontend provides a complete user experience built on top of the backend APIs.

Key frontend features include:

* Authentication flows
* Video browsing and viewing
* Creator channels
* Video uploads
* Dashboard analytics
* Playlist management
* Responsive layouts
* Protected routes
* State management and API integration

While the project includes a complete frontend application, the primary focus remains on backend system design, API development, authentication flows, media handling, and database architecture.

---

## Learning Objectives

This project was developed as a practical learning exercise to gain hands-on experience with modern backend development and full-stack application architecture.

Key areas explored include:

* REST API Design
* Authentication & Authorization
* JWT Access and Refresh Token Flows
* MongoDB Data Modeling
* Mongoose Aggregation Pipelines
* Middleware Architecture
* File Upload Workflows
* Cloudinary Integration
* Error Handling Strategies
* Backend Project Structure
* Scalable Application Design
* Frontend and Backend Integration

The emphasis was placed on understanding how production-oriented backend systems are organized and implemented rather than simply replicating isolated features.

---

## Future Improvements

Potential areas for future development include:

* Redis-based caching
* WebSocket support
* Background job processing
* Automated testing
* Docker containerization
* CI/CD pipelines
* API documentation with Swagger/OpenAPI
* PostgreSQL implementation
* Advanced analytics
* Search and recommendation systems

---

## Disclaimer

This project was built for educational and portfolio purposes to practice and reinforce full-stack development concepts. It is intended as a learning-focused implementation of production-inspired architecture and patterns rather than a commercial-grade platform.

---

## Acknowledgements

This project was originally inspired by and developed while following the backend development series by Hitesh Choudhary.

The foundational architecture, concepts, and learning approach were derived from the course material. The project was further extended, completed, and customized as part of a personal learning journey to gain practical experience in backend and full-stack application development.

Special thanks to Hitesh Choudhary for creating accessible and industry-oriented educational content that made this project possible.

---

## License

This repository is intended for educational and portfolio purposes only.

Please refer to the original course and learning materials by Hitesh Choudhary before reusing any course-specific content. All additional implementations, extensions, and modifications in this repository were created as part of personal learning and practice.