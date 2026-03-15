# WanderLust

WanderLust is a full-stack travel listing platform where users can explore destinations, create listings, upload images, and share reviews.  
The application implements authentication, authorization, cloud image storage, and interactive maps to simulate a real-world property listing system similar to accommodation marketplaces.

---

## Live Demo

https://wanderlust-js8e.onrender.com

---

## Overview

The goal of this project was to build a complete full-stack application while learning backend architecture and modern web development practices.

The platform allows users to:

- Browse travel listings
- View detailed property pages
- Upload images for listings
- Add and manage reviews
- Interact with location maps
- Manage listings they created

The application follows the **MVC architecture** and integrates several external services for cloud storage and mapping.

---

## Features

### User Authentication
- Secure user registration and login
- Session-based authentication
- Protected routes for authenticated users

### Authorization
- Only listing authors can edit or delete their listings
- Only review authors can modify or delete their reviews

### Listing Management
- Create, edit, and delete property listings
- Upload images for listings
- Display listing details including location and reviews

### Reviews System
- Users can add reviews to listings
- Review authorship is tracked
- Users can edit or delete their own reviews

### Interactive Maps
- Listings display their location using an interactive map
- Helps users visually understand property location

### Cloud Image Storage
- Images uploaded for listings are stored using cloud storage
- Enables scalable image handling

### Data Validation
- Server-side validation ensures only valid data is stored
- Prevents invalid or malicious input

### Performance Optimization
- Lazy loading used for better image loading performance
- Caching used to improve response times

---

## Tech Stack

### Frontend
- EJS (Embedded JavaScript Templates)
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### External Services
- Cloudinary (Image Storage)
- Google Maps (Map Integration)

### Other Tools
- Session management
- Server-side validation
- MVC project structure

---

## Architecture

The project follows **MVC (Model-View-Controller) architecture** to maintain separation of concerns.

```
Client (Browser)
       │
       ▼
Express Routes
       │
       ▼
Controllers
       │
       ▼
Models (MongoDB / Mongoose)
       │
       ▼
External Services
   • Cloudinary
   • Google Maps
```

This structure improves code maintainability and scalability.

---

## Installation

Clone the repository:

```
git clone https://github.com/ViralJain758/WanderLust.git
```

Navigate into the project directory:

```
cd WanderLust
```

Install dependencies:

```
npm install
```

Start the application:

```
node app.js
```

The server will run locally on:

```
http://localhost:8080
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
DB_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
MAP_API_KEY=
SESSION_SECRET=
```

These variables are required for database connection, cloud storage, map integration, and session security.

---

## Project Structure

```
controllers/
models/
routes/
views/
public/
utils/

middleware.js
schema.js
cloudConfig.js
app.js
```

- **controllers** → application logic  
- **models** → database schemas  
- **routes** → API routes  
- **views** → EJS templates  
- **public** → static assets (CSS, JS, images)  
- **utils** → helper utilities  

---

## Author

Viral Jain

GitHub:  
https://github.com/ViralJain758
