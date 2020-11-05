'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
    bio: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    const columnMapping = {
      through: 'Upvote',
      otherKey: 'postId',
      foreignKey: 'userId'
    }
    User.hasMany(models.Post, { foreignKey: 'userId' }),
    User.hasMany(models.Comment, { foreignKey: 'userId' })
    User.belongsToMany(models.Post, columnMapping)
  };
  return User;
};
