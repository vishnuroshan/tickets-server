
require('dotenv').config();
require('./db/connection');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const middleWare = require('./utils/middlewares');
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(morgan('common'));

// public routes

app.use('/auth/', routes.auth);

// private routes
app.use(middleWare.checkToken);
app.use('/posts/', routes.post);

module.exports = app;
