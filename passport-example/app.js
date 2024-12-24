/**
 * 新增Passport中介層與Session初始化
 */
const session = require('express-session');
const passport = require('passport');

// Session 初始化
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Passport 初始化
app.use(passport.initialize());
app.use(passport.session());


const authRouter = require('./routes/auth');

app.use('/auth', authRouter);
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: "1072667935053-3q3h89f58iq9v2ss4uied1n6g7q3g68u.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  (accessToken, refreshToken, profile, cb) => {
    return cb(err, profile);
  }
));
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});



var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
