const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session)

// load config
dotenv.config({ path: './config/config.env' });

// passport config
require('./config/passport')(passport);

const app = express();
const connectDB = require('./config/db');
connectDB();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// session
app.use(
	session({
		secret: 'oauth is weird',
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	}),
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Mounted routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/question', require('./routes/question'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
	console.log(`Website Running! on port ${PORT}`);
});