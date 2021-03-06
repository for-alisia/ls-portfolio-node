const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const frontRoutes = require('./routes/front');
const sessionConf = require('./config');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pages'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: sessionConf.secret,
    key: 'sessionkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
  })
);

// Custom routes
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use(frontRoutes);

// Error handler
app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

// Server
const server = app.listen(process.env.PORT || 8000, function () {
  console.log('Server is listening on:' + server.address().port);
});
