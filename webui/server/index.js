const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const dist_dir = path.join(__dirname, '../dist'); 
const html_file = path.join(dist_dir, 'index.html'); 

console.log(app.get('env'));

if (process.env.NODE_ENV == 'production'){
  app.use(express.static(dist_dir));
  app.get('/', (req, res) => {
    res.sendFile(html_file);
  });
}

app.get('/', (req, res) => {
  res.send('Hello, from Express!');
});

app.get('/api', (req, res) => {
  res.send('Hello, from Express API!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

