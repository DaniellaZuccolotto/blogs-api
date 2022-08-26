require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const { email } = jwt.verify(token, JWT_SECRET);
    const { id } = await User.findOne({ where: { email } });
    req.user = { email, id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};