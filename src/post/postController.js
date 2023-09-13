const { Message, User } = require('./../../models/userModel');
const { getPostsByUser, getPostsByDate, getPostsByTitle } = require('./postService');

// Crear una nueva publicación
const createPost = async (req, res) => {
    console.log('createPost is running');
  const { title, content } = req.body;
  const userId = req.userId; 
  console.log("🚀 ~ req.userId:", req.userId)
 

  try {
    const newPost = await Message.create({
      title,
      content,
      userId,
      
    });

    res.status(201).json({ message: 'Post created', postId: newPost.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Obtener todas las publicaciones
const getAllPosts = async () => {
  try {
    const posts = await Message.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      include: {
        model: User,
        attributes: ['name', 'email']
      }
    });
    return { status: 200, data: { posts } };
  } catch (error) {
    return { status: 500, data: { message: 'Something went wrong' } };
  }
};


const getFilteredPosts = async (req, res) => {
  const { date, keyword } = req.query;

  // Si se proporciona una fecha, filtra por esa fecha.
  if (date) {
    const posts = await getPostsByDate(date + "T00:00:00Z", date + "T23:59:59Z");
    return res.json(posts);
  }

  // Si se proporciona una palabra clave, filtra por esa palabra clave.
  if (keyword) {
    const posts = await getPostsByTitle(keyword);
    return res.json(posts);
  }

  // Si no se proporcionan filtros, devuelva todas las publicaciones.
  const result = await getAllPosts();
  return res.status(result.status).json(result.data);
};


  const getMyPosts = async (req, res) => {
    const userId = req.userId;
    const { date } = req.query; // Obtener la fecha desde la query
    let myPosts = [];
  
    try {
      if (date) {
        // Si hay una fecha, filtrar las publicaciones
        myPosts = await getPostsByDate(date + "T00:00:00Z", date + "T23:59:59Z");
      } else {
        // Si no hay una fecha, obtener todas las publicaciones del usuario
        myPosts = await getPostsByUser(userId);
      }
      res.status(200).json(myPosts);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  
  

module.exports = { createPost, getAllPosts, getFilteredPosts, getMyPosts };
