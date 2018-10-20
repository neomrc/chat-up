'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('account', {
    username: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    token: DataTypes.STRING,
    last_login: DataTypes.DATE,
    last_login_ip: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: account => {
        const salt = bcrypt.genSaltSync();
        account.salt = salt;
        account.password = account.password && account.password !== '' ? bcrypt.hashSync(account.password, salt) : '';
        account.token = jwt.sign({username: account.username}, salt, {expiresIn: 60 * 60 * 24 * 14});
        account.last_login = new Date();
        return account;
      },
    }
  });
  Account.associate = function(models) {
    Account.belongsTo(models.profile, {
      foreignKey: 'user_id',
    });
  };
  return Account;
};