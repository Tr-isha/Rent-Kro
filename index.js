// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const path = require('path');

// const userRoutes = require('./routes/userRoutes');
// const itemRoutes = require('./routes/itemRoutes');
// const rentalRoutes = require('./routes/rentalRoutes');

// const app = express();

// const hbs = require('hbs');
// hbs.registerPartials(path.join(__dirname, 'views/partials'));

// hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
//   switch (operator) {
//     case '===':
//       return (v1 === v2) ? options.fn(this) : options.inverse(this);
//     default:
//       return options.inverse(this);
//   }
// });

// mongoose.connect('mongodb://localhost:27017/rentkro', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'hbs');

// app.use(session({
//   secret: 'rentkro_secret',
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use((req, res, next) => {
//   res.locals.user = req.session.user || null;
//   next();
// });

// app.use('/users', userRoutes);
// app.use('/items', itemRoutes);
// app.use('/rentals', rentalRoutes);

// app.get('/', (req, res) => {
//   res.render('home');
// });

// app.get('/logout', (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/');
//   });
// });

// app.listen(3000, () => console.log('Rent Kro running on http://localhost:3000'));










const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

const User = require('./models/User'); // Add User model to fetch user info

const app = express();

const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

mongoose.connect('mongodb://localhost:27017/rentkro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');

// Session middleware
app.use(session({
  secret: 'rentkro_secret',
  resave: false,
  saveUninitialized: false, // Changed to false for better session management
}));

// Middleware to populate req.user and res.locals.user based on session.userId
app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
        res.locals.user = user; // So user info is accessible in all views
      } else {
        res.locals.user = null;
      }
    } catch (err) {
      console.error('Error fetching user from session:', err);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});

// Routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/rentals', rentalRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => console.log('Rent Kro running on http://localhost:3000'));
