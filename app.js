import express, { urlencoded } from 'express';
import expressLayouts from 'express-ejs-layouts';
import { connect } from 'mongoose';
import passport, { initialize, session as _session } from 'passport';
import flash from 'connect-flash';
import session from 'express-session';



const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
import { mongoURI as db } from './config/keys';

// Connect to MongoDB
connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(initialize());
app.use(_session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
