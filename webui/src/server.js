const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, from Express!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
