 var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const register = require("./routes/register");
const dash = require("./routes/dash");
const signup = require("./routes/signup");
const about = require("./routes/about");
const service = require("./routes/service");
const home = require("./routes/index");
const reset = require("./routes/reset");
const add = require("./routes/add");
const table1 = require("./routes/table1");
const table2 = require("./routes/table2");
const table3 = require("./routes/table3");
const table4 = require("./routes/table4");
const table5 = require("./routes/table5");
const table6 = require("./routes/table6");
const table7 = require("./routes/table7");
const table8 = require("./routes/table8");


var dbCon = mongodb.MongoClient.connect('mongodb://localhost:27017');
console.log('Database is Connected');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', about);
app.use('/service', service);
app.use('/home', home);
app.use('/reset', reset);
app.use('/register', register);
app.use('/dash', dash);
app.use('/signup', signup);
app.use('/add', add);
app.use('/table1', table1);
app.use('/table2', table2);
app.use('/table3', table3);
app.use('/table4', table4);
app.use('/table5', table5);
app.use('/table6', table6);
app.use('/table7', table7);
app.use('/table8', table8);

app.post('/login', function(req, res){
  dbCon.then(function(db){
    delete req.body.uname;
    db.Collection('Users').insertOne(req.body)
  });
  console.log(req.body);
    res.render("dash");
});

app.post('/register', function(req, res){
  dbCon.then(function(db){
    delete req.body.uname;
    db.Collection('Users').insertOne(req.body)
  });
  console.log(req.body);
    res.render("dash");
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {

  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
