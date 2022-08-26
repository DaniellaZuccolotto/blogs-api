module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  // Category.associate = (models) => {
  //   Category.hasMany(models.BlogPost,
  //     { foreignKey: 'CategoryId', as: 'blogposts' });
  // };

  return Category;
};