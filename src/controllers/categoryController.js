const categoryService = require('../services/categoryService');

async function createCategory(req, res) {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).send({ message: '"name" is required' });
  }   
  const userResponse = await categoryService.createCategory(name);
  return res.status(201).json(userResponse);
}

module.exports = { createCategory };