const { PORT, DB_CONN_STRING } = require('../.config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const massive = require ('massive');
const session = require ('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersController = require('./controllers/users_controller');

const app = express();
app.use(bodyParser.json()); //Must come before cors
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
///////////////////////////////////////////////////////////////////////////
// DATABASE
massive(DB_CONN_STRING).then(instance => {
  app.set('db', instance);
}).catch(console.log);
// Set a reference to the massive instance on Express' app:
// app.set('db', masscxiveInstance);
// console.log(db);
// massive(DB_CONN_STRING)
//   .then(dbInstance => {
//     app.set('db', dbInstance);
//     const db = app.get('db');
//     console.log('Database Connection Successful.')})
//   .catch(err => console.log('Database Connection Failure: ', err))
///////////////////////////////////////////////////////////////////////////
app.use(session({ 
  secret: 'placeholder',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}));

///////////////////////////////////////////////////////////////////////////
//PERSISTENCE
passport.serializeUser(function(user, done) {
  console.log('SERIALIZE USER: ', user.id + ': ' + user.username)
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  db.users.findOne({where: {id: id}}).then((user) => {
    console.log('DESERIALIZE USER', user)
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  }).catch(err => done(err));
})
///////////////////////////////////////////////////////////////////////////
// Passport strategies
passport.use('local', new LocalStrategy(function(username, password, done) {
    const db = app.get('db');
    db.users
      .findOne({ username: username })
      .then(user => {
        console.log(user.password);
        if (!user) {
          return done(null, false);
        }
        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(err => {
        console.log(err);
        if (err) {
          return done(err);
        }
      });
  })
);
///////////////////////////////////////////////////////////////////////////
// Login endpoints
// This user controller will have to be modified.
app.post('/api/auth/local', passport.authenticate('local'), 
  function(req, res) {
    res.status(200).send()
});
app.post('/api/auth/login', usersController.login)
app.post('/api/auth/register', usersController.create)
app.post('/api/auth/logout', usersController.logout)

///////////////////////////////////////////////////////////////////////////
// More End Points

///////////////////////////////////////////////////////////////////////////
// More End Points

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`)})
  