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
    User.hasMany(models.Post, { foreignKey: 'userId' }),
    User.hasMany(models.Comment, { foreignKey: 'userId'})
  };
  return User;
};
