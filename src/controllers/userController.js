const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const { JWT_SECRET } = process.env;

async function createUser(req, res) {
    const userResponse = await userService.userService(req.body);
    if (userResponse.message) {
      const { status, message } = userResponse;
      return res.status(status).json({ message });
    }
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const { email } = req.body;
    const token = jwt.sign({ email }, JWT_SECRET, jwtConfig); 
    return res.status(201).json({ token });
}

async function getAll(req, res) {
    const responseService = await userService.getAll();
    return res.status(200).json(responseService);
}

async function getById(req, res) {
  const { id } = req.params;
  const responseService = await userService.getById(id);
  if (responseService.message) {
    const { status, message } = responseService;
    return res.status(status).json({ message });
  }
  return res.status(200).json(responseService.dataValues);
}

async function deleteUser(req, res) {
  await userService.deleteUser(req.user.id);
  return res.status(204).end();
}

module.exports = { createUser, getAll, getById, deleteUser };