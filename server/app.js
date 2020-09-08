const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: "AIzaSyD93hKn54YxT1sAE5qKA3DZMyvAz0P6tKQ",
  authDomain: "falcon-project-f2431.firebaseapp.com",
  databaseURL: "https://falcon-project-f2431.firebaseio.com",
  projectId: "falcon-project-f2431",
  storageBucket: "falcon-project-f2431.appspot.com",
  messagingSenderId: "555496500915",
  appId: "1:555496500915:web:831bc1d32d318fa8504ac6",
  measurementId: "G-E492JJPFVW"
}

admin.initializeApp(firebaseConfig);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

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
