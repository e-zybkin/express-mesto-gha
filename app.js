const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards')

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  req.user = {
    _id: '624d6fa3426179b2adcf06ba',
  };

  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
