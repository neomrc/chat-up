module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "chat_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "chat_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "dialect": "mysql",
    "logging": false
  }
};
