const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRouter = require('./routes/apiRouter.js');

if (process.env.NODE_ENV !== 'production') {
  require('@babel/register') ({
    presets: ["@babel/preset-env"]
  });
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const dist_dir = path.join(__dirname, '../client/dist'); 
console.log(app.get('env'));

if (process.env.NODE_ENV == 'production'){
  app.use(express.static(dist_dir));
}

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});