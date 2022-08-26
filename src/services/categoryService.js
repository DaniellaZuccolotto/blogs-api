const { Category } = require('../database/models');

const createCategory = async (name) => {
  await Category.create({ name });
  const response = await Category.findOne({ where: { name } });
  return response;
};

module.exports = { createCategory };