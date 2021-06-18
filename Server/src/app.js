const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// settings
app.set('port', process.env.PORT || 4000);
dotenv.config();

//middlewares
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/user',require('./routes/user.routes'));
app.use('/api/auth',require('./routes/auth.routes'));
app.use('/api/budget',require('./routes/budget.routes'));

// database
require('./database');

module.exports = app;