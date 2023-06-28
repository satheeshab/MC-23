const express = require('express');
const { apiRouter } = require('./api');
const { authRouter } = require('./auth');

const router = express.Router();

router.use('/api', apiRouter);
router.use('/auth', authRouter);

console.log('router module ***********');
console.log(module);

module.exports = { router };