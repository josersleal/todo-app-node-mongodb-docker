const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World Again');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
