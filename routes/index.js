const app = require('express')();
const createError = require('http-errors');

/* GET home page. */
app.get('/', (req, res) => {
  res.status(200).send(`You're in the right place`);
});

app.use('/api/auth', require('./auth'));
app.use('/api/profile', require('./profile'));

app.all('*', (req, res) => {
  res.status(404).send(createError(404));
});

module.exports = app;
