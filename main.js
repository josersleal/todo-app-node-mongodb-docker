const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
    console.log('Error connecting to database');
    process.exit(1);
  });

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World Again');
});

require('./app/routes/todo.route.js')(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
