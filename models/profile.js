'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
  };
  return Profile;
};