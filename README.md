# StreamCore

A backend service for a video-sharing platform built with Node.js, Express.js, MongoDB, and Cloudinary.

StreamCore was developed as a hands-on learning project to explore how modern backend systems are designed and implemented. The project focuses on authentication, media management, user interactions, and scalable API architecture while following industry-standard development practices.

---

## Overview

StreamCore provides the backend infrastructure required for a video-sharing platform. It exposes RESTful APIs for user management, video publishing, subscriptions, playlists, comments, likes, and creator analytics.

The primary goal of this project was to gain practical experience building a production-style backend application while understanding how different components of a modern web platform interact.

---

## Key Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Access token and refresh token workflow
* Secure logout mechanism
* Protected API routes
* Password management

### User Management

* User profile management
* Avatar upload support
* Cover image upload support
* Account updates
* Watch history tracking

### Video Management

* Video publishing
* Thumbnail uploads
* Video updates
* Video deletion
* Publish and unpublish functionality
* Video discovery and retrieval

### Channel Features

* Channel profiles
* Subscriber management
* Subscription tracking
* Creator statistics

### Comments & Interactions

* Comment creation
* Comment updates
* Comment deletion
* Video likes
* Comment likes
* Tweet likes

### Playlists

* Create playlists
* Update playlists
* Delete playlists
* Add videos to playlists
* Remove videos from playlists

### Tweets

* Create tweets
* Update tweets
* Delete tweets
* Retrieve user tweets

### Analytics

* Channel statistics
* Total views
* Subscriber counts
* Like counts
* Uploaded video metrics

### Media Handling

* Cloudinary integration
* File uploads using Multer
* Avatar management
* Cover image management
* Video and thumbnail uploads

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
* HTTP-only Cookies

### File Storage

* Cloudinary
* Multer

### Utilities

* dotenv
* cookie-parser
* cors
* bcrypt

---

## Project Structure

```text
src/
│
├── controllers/      # Application business logic
├── models/           # Database schemas and models
├── routes/           # API route definitions
├── middlewares/      # Authentication and request middleware
├── utils/            # Helper utilities and shared modules
├── db/               # Database connection configuration
│
├── app.js            # Express application configuration
└── index.js          # Application entry point
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/subhasankarsahu/Project-Stream-Core.git
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

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

### Start Development Server

```bash
npm run dev
```

---

## API Modules

The application is organized into the following API modules:

* Users
* Videos
* Comments
* Likes
* Subscriptions
* Playlists
* Tweets
* Dashboard
* Healthcheck

Base URL:

```text
/api/v1
```

---

## Development Goals

This project was built to strengthen understanding of:

* REST API design
* Authentication and authorization workflows
* JWT token management
* Database modeling with MongoDB
* Mongoose aggregation pipelines
* Middleware architecture
* File upload handling
* Cloudinary integration
* Backend project organization
* Scalable application structure

Rather than being developed as a commercial product, StreamCore was created as a practical learning exercise focused on applying backend engineering concepts in a realistic project environment.

---

## Future Enhancements

Potential areas for future development include:

* Redis caching
* WebSocket-based real-time features
* Background job processing
* Automated testing
* Docker support
* API documentation using Swagger/OpenAPI
* PostgreSQL implementation
* CI/CD pipelines
* Search and recommendation systems
* Performance optimization and monitoring

---

## Contributing

Contributions, suggestions, and feedback are welcome. Feel free to open an issue or submit a pull request.

---

## Acknowledgments

This project was inspired by backend development learning resources and expanded through independent implementation and feature development to reinforce practical software engineering concepts.

---

## License

This project is released under the MIT License.
