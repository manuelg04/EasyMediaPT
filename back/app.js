const express = require('express');
const cors = require('cors');
const { register } = require('./src/auth/auth');
const { login } = require('./src/auth/auth');




const app = express();

app.use(cors());
app.use(express.json());

// Registro de usuarios
app.post('/api/register', register);

// Inicio de sesión
app.post('/api/login', login);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
