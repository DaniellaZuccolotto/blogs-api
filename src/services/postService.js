const { BlogPost, Category, PostCategory, sequelize } = require('../database/models');

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

module.exports = { createPost };