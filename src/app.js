const express = require('express');
const app = express();
const passport = require('passport');
const UserRoute = require('./routes/User/UserRoute');
const ContactRoute = require('./routes/Contact/ContactRouter');
require('./auth/auth');

/**
 * Routes
 */
app.use('/', UserRoute);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/contact', passport.authenticate('jwt', { session: false }), ContactRoute);

//Handle errors
// eslint-disable-next-line no-unused-vars
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.json({ error: err });
// });

module.exports = app;