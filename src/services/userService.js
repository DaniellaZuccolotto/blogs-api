const { User } = require('../database/models');

const validate = async (displayName, email, password) => {
  if (displayName.length < 8) {
    return { status: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!(email.match(emailRegex))) {
    return { status: 400, message: '"email" must be a valid email' };
  }
  if (password.length < 6) {
    return { status: 400, message: '"password" length must be at least 6 characters long' };
  }
  const responseUser = await User.findOne({ where: { email } });
  console.log(responseUser, 'user');
  if (responseUser) {
    return { status: 409, message: 'User already registered' };
  }
  return true; 
};

const userService = async ({ displayName, email, password, image }) => {
  const validation = await validate(displayName, email, password);
  if (validation !== true) return validation;
  await User.create({ displayName, email, password, image });
  return {};
};

module.exports = { userService };