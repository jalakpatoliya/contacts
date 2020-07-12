const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const passport = require('passport');
const UserRoute = require('./routes/User/UserRoute');
require('./auth/auth');

app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Routes
 */
app.use('/', UserRoute);

//We plugin our jwt strategy as a middleware so only verified users can access this route
// app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);


//Handle errors
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;