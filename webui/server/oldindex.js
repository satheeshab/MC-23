const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const dist_dir = path.join(__dirname, '../client/dist'); 
console.log(app.get('env'));

if (process.env.NODE_ENV == 'production'){
  app.use(express.static(dist_dir));
}

app.get('/api/home', (req, res) => {
  res.send('Hello, from express backend!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});