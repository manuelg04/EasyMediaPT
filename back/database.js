const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://default:XTO2U0mbrwqk@ep-sweet-resonance-132719.us-east-2.postgres.vercel-storage.com:5432/verceldb');

module.exports = sequelize;
