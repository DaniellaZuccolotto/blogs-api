module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
        foreignKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
        foreignKey: true
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("PostCategories");
  }
};

