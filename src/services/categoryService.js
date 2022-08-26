const { Category } = require('../database/models');

const createCategory = async (name) => {
  await Category.create({ name });
  const response = await Category.findOne({ where: { name } });
  return response;
};

const getAll = async () => {
  const responseService = await Category.findAll();
  return responseService;
};

module.exports = { createCategory, getAll };