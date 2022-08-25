const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const { JWT_SECRET } = process.env;

async function Login(req, res) {
  try {
    const loginResponse = await loginService.validateLogin(req.body);
    if (loginResponse.message) {
      const { status, message } = loginResponse;
      return res.status(status).json({ message });
    } 
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const token = jwt.sign({ data: loginResponse.dataValues.email }, JWT_SECRET, jwtConfig);
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { Login };