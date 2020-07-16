/* eslint-disable no-undef */
require('dotenv').config();
const app = require('./src/app');
const http = require('http');
const PORT = process.env.PORT || 5000;

/**
 * connecting to db
 */
require('./src/lib/mongoose');

/**
 * importing models
 */
require("./src/models/User");
require("./src/models/Contact");

http.createServer(app).listen(PORT, console.log(`server started at port:${PORT}`));