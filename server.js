const express = require('express');

const server = express();

// your code here
const db = require('./data/accounts-model.js')
const accountsRouter = require('./accountsRouter.js')

server.use(express.json());
server.use('/accounts', accountsRouter)
server.use(logger)


function logger(req, res, next) {
    console.log(` Request method: ${req.method} Request url: ${req.originalUrl} timestamp: ${Date.now()}`);
    next();
  };




module.exports = server;