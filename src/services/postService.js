const { BlogPost, Category, PostCategory, sequelize, User } = require('../database/models');

const validationCategoy = async (categories) => {
  if (!categories) return { status: 400, message: '"categoryIds" not found' };
  const verifyCategory = categories.map(async (category) => {
    const categoryResponse = await Category.findByPk(category);
    if (!categoryResponse) {
      return { status: 400, message: '"categoryIds" not found' };
    }
    return true;
  });
  const verifyFind = verifyCategory.find((response) => response !== true);
  if (verifyFind !== undefined) return verifyFind;
  return true;
};

const createPost = async (id, title, content, categories) => {
  const validationResponse = await validationCategoy(categories);
  if (validationResponse !== true) {
    return validationResponse;
  }
  const sequelizeTrans = await sequelize.transaction(async (transaction) => {
    const responsePost = await BlogPost.create({ title, content, userId: id }, { transaction });
    await PostCategory.bulkCreate(categories
      .map((category) => ({ postId: responsePost.id, categoryId: category })), { transaction });
    return responsePost.dataValues;
  });
  return sequelizeTrans;
};

const getAll = async () => {
  const responseService = await BlogPost.findAll({
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });
  return responseService;
};

module.exports = { createPost, getAll };