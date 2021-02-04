'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    announcements: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});
  Post.associate = function (models) {
    const columnMapping = {
      through: 'Upvote',
      otherKey: 'userId',
      foreignKey: 'postId'
    }
    Post.belongsTo(models.User, { foreignKey: 'userId' }),
    Post.hasMany(models.Comment, { foreignKey: 'postId' }),
    Post.belongsToMany(models.User, columnMapping)
  };
  return Post;
};
