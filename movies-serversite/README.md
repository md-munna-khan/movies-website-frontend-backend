**Marvel Movies - Server Side**
Welcome to the server-side repository for Marvel Movies! This backend service powers the Marvel Movies application, providing APIs for user authentication, movie data management, and more.

**Technologies Used**
Node.js: JavaScript runtime for building scalable network applications.
Express.js: Web framework for Node.js to create APIs and handle HTTP requests.
MongoDB: NoSQL database for storing movie and user data.
Firebase Admin SDK: For server-side Firebase operations like user authentication and database interactions.

**API Endpoints**
Authentication
POST /api/register: Register a new user.
POST /api/login: Login a user and return a JWT token.
Movies
GET /api/movies: Get all movies.
GET /api/movies/:id: Get a movie by ID.
POST /api/movies: Add a new movie (authentication required).
PUT /api/movies/:id: Update a movie by ID (authentication required).
DELETE /api/movies/:id: Delete a movie by ID (authentication required).
Favorites
GET /api/favorites: Get all favorite movies for the logged-in user.
POST /api/favorites/:id: Add a movie to favorites (authentication required).
DELETE /api/favorites/:id: Remove a movie from favorites (authentication required).