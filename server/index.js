const { PORT, DB_CONN_STRING, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_AUTH_SCOPE, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_REDIRECT_URI } = require('../.config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const massive = require ('massive');
const session = require ('express-session');
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy, 
      GoogleStrategy = require('passport-google-oauth2').Strategy;
      FacebookStrategy = require('passport-facebook').Strategy;
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
  console.log('SERIAL USER', user)
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
passport.use('local', new LocalStrategy(function(username, password, done) { // Need to ad ability to create new account
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
  const googleID = 'google|' + profile.id;
  db.getUser([googleID])
    .then(user => {
      if (!user[0]) {
        db.createGoogleUser([googleID])
          .then(user => {
          console.log(`Created Google user: ${user[0].id} ${user[0].username}`)
          return done(null, user[0]);
        }).catch(err => {
          console.log('Failed to create Google user: ', err)
          return done(err);
        })
      } else {
        return done(null, user[0]);
      }
    })
    .catch((err) => done(err));
}))

passport.use('facebook', new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: FACEBOOK_REDIRECT_URI
}, 
function(accessToken, refreshToken, profile, done) {
  const db = app.get('db');
  const facebookID = 'facebook|' + profile.id;
  db.getUser([facebookID])
    .then(user => {
      if (!user[0]) {
        db.createFacebookUser([facebookID])
          .then(user => {
          console.log(`Created Facebook user: ${user[0].id} ${user[0].username}`)
          return done(null, user[0]);
        }).catch(err => {
          console.log('Failed to create Facebook user: ', err)
          return done(err);
        })
      } else {
        return done(null, user[0]);
      }
    })
    .catch((err) => done(err));
}))
///////////////////////////////////////////////////////////////////////////
// Auth endpoints
// This user controller will have to be modified.
app.post('/auth/local', passport.authenticate('local'), 
  function(req, res) {
    res.status(200).send();
});
app.get('/auth/google', passport.authenticate('google', 
  GOOGLE_AUTH_SCOPE), 
  function(req, res) {
    res.status(200).send();
})

app.get( '/auth/google/callback', 
  passport.authenticate( 'google', { 
    successRedirect: '/', //Will redirect to user dashboard
    failureRedirect: '/'
})); // Might need to return the user here

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get( '/auth/facebook/callback', 
  passport.authenticate( 'facebook', { 
    successRedirect: '/', //Will redirect to user dashboard
    failureRedirect: '/'
}));


app.post('/api/auth/login', usersController.login)
app.post('/api/auth/register', usersController.create)
app.post('/api/auth/logout', usersController.logout)

///////////////////////////////////////////////////////////////////////////
// More End Points

///////////////////////////////////////////////////////////////////////////
// More End Points

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`)})
  