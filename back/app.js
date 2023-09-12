const express = require('express');
const cors = require('cors');
const { register } = require('./src/auth/auth');
const { login } = require('./src/auth/auth');
const { createPost, getAllPosts, getFilteredPosts } = require('./src/post/postController');
const authenticateJWT = require('./src/middlewares/authenticateJWT');



const app = express();

app.use((req, res, next) => {
  console.log('A request was made');
  next();
});

console.log('App is starting');

app.use(cors());
app.use(express.json());

// Registro de usuarios
app.post('/api/register', register);

// Inicio de sesión
app.post('/api/login', login);


// Rutas para publicaciones
app.post('/api/posts', authenticateJWT, createPost);
app.get('/api/posts', authenticateJWT, getAllPosts);

//filtrado de publicaciones
app.get('/api/posts/filter', authenticateJWT, getFilteredPosts);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
