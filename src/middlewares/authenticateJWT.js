const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
  console.log('Middleware is running');
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  


  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }



    req.userId = decoded.userId; 

    next();
  });
};

module.exports = authenticateJWT;
