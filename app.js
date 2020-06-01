const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const frontRoutes = require('./routes/front');

const app = express();
app.set('view engine', 'pug');
app.set('views', 'views/pages');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Custom routes
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use(frontRoutes);

app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Server
const server = http.createServer(app);
server.listen(8000);
