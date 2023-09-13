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
const getAllPosts = async (req, res) => {
  try {
    const posts = await Message.findAll({
      include: {
        model: User,
        attributes: ['name', 'email']
      }
    });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getFilteredPosts = async (req, res) => {
    const { userId, startDate, endDate, keyword } = req.query;
  
    if (userId) {
      const posts = await getPostsByUser(userId);
      return res.json(posts);
    }
  
    if (startDate && endDate) {
      const posts = await getPostsByDate(startDate, endDate);
      return res.json(posts);
    }
  
    if (keyword) {
      const posts = await getPostsByTitle(keyword);
      return res.json(posts);
    }
  
    res.json({ message: 'No filter provided' });
  };

  const getMyPosts = async (req, res) => {
    const userId = req.userId; 
    try {
      const myPosts = await getPostsByUser(userId); 
      res.status(200).json(myPosts);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  
  

module.exports = { createPost, getAllPosts, getFilteredPosts, getMyPosts };
