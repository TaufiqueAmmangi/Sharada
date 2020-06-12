require('./models/db');

const { globalVariables } = require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const passport = require('passport');
const bodyparser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const employeeController = require('./controllers/employeeController');
const registerController = require('./controllers/registerController');

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/',
    partialsDir: [
        //  path to your partials
        path.join(__dirname, 'views/layouts'),
    ]
    
}));
app.set('view engine', 'hbs');

app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

/* Passport Initialize */
app.use(passport.initialize());
app.use(passport.session());

app.use(globalVariables);

app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();   


});

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

//app.use('/employee', employeeController);
app.use('/register/', registerController);

