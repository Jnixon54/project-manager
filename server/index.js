const { PORT, DB_CONN_STRING, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_AUTH_SCOPE } = require('../.config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const massive = require ('massive');
const session = require ('express-session');
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy, 
      GoogleStrategy = require('passport-google-oauth2').Strategy;
const google= require('googleapis'),
      OAuth2 = google.auth.OAuth2,
      { google_auth_url, oauth2Client } = require('./google_auth/googleAuthUrl')
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
passport.use('google', new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_REDIRECT_URI
}, 
function(accessToken, refreshToken, profile, done) {
  const db = app.get('db');
  db.users.findOne({username: 'google|' + profile.id})
    .then(user => {
      console.log(user);
      // console.log('GOOGLE USER: ', user.dataValues.id)
      // console.log('GOOGLE CREATED: ', created)
      return done(null, user);
    })
    .catch((err) => done(err));
}))
///////////////////////////////////////////////////////////////////////////
// Login endpoints
// This user controller will have to be modified.
app.post('/api/auth/local', passport.authenticate('local'), 
  function(req, res) {
    res.status(200).send();
});
app.get('/api/auth/google', passport.authenticate('google', 
  GOOGLE_AUTH_SCOPE), 
  function(req, res) {
    res.status(200).send();
})

app.get( '/auth/google/callback', 
  passport.authenticate( 'google', { 
    successRedirect: '/',
    failureRedirect: '/login'
}));
app.post('/api/auth/login', usersController.login)
app.post('/api/auth/register', usersController.create)
app.post('/api/auth/logout', usersController.logout)

///////////////////////////////////////////////////////////////////////////
// More End Points

///////////////////////////////////////////////////////////////////////////
// More End Points

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`)})
  