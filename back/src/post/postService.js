
const { Message, User } = require('../../models/userModel');
const { Op } = require('sequelize');

const getPostsByUser = async (userId) => {
  return await Message.findAll({
    where: { userId },
    include: User
  });
};

const getPostsByDate = async (startDate, endDate) => {
  return await Message.findAll({
    where: {
      createdAt: {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      }
    },
    include: User
  });
};

const getPostsByTitle = async (keyword) => {
  return await Message.findAll({
    where: {
      title: {
        [Op.like]: `%${keyword}%`
      }
    },
    include: User
  });
};

module.exports = { getPostsByUser, getPostsByDate, getPostsByTitle };
