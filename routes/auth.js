const app = require('express')();

app.get('/', (req, res) => {
  res.send(`you're in auth landing page`);
});

module.exports = app;
