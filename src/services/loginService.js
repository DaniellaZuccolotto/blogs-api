const { User } = require('../database/models');

const validate = (email, password) => {
  if (!email || !password) {
    return { status: 400, message: 'Some required fields are missing' };
  }
  if (email === '' || password === '') {
    return { status: 400, message: 'Some required fields are missing' };
  }
  return true;
};

const validateLogin = async ({ email, password }) => {
  const validation = validate(email, password);
  if (validation !== true) return validation;
  const responseUser = await User.findOne({ where: { email } });
  if (!responseUser) {
    return { status: 400, message: 'Invalid fields' };
  }
  if (responseUser.dataValues.password !== password) {
    return { status: 400, message: 'Invalid fields' };
  }
  return responseUser;
};

module.exports = { validateLogin };
