const {
  PORT,
  DB_CONN_STRING,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_AUTH_SCOPE,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_REDIRECT_URI
} = require('../.config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  GoogleStrategy = require('passport-google-oauth2').Strategy;
FacebookStrategy = require('passport-facebook').Strategy;
const flash = require('req-flash');
const hashPassword = require('./utils/crypto');
const usersController = require('./controllers/users_controller');
const projectsController = require('./controllers/projects_controller');
const tasksController = require('./controllers/tasks_controller');
const socket = require('./socketServer');



const app = express();
///////////////////////////////////////////////////////////////////////////
// DATABASE
massive(DB_CONN_STRING)
  .then(instance => {
    app.set('db', instance);
  })
  .catch(console.log);
// app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json()); //Must come before cors
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
app.use(
  session({
    secret: 'placeholder',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000, httpOnly:true }
  })
);
app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
//PERSISTENCE
passport.serializeUser(function(user, done) {
  console.log(`SERIALIZE USER: ${user.id} | ${user.username}`);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log(`DESERIALIZE USER: ${id}`);
  // db.users
  //   .findOne({ where: { id: id } })
  //   .then(user => {
  //     console.log(`DESERIALIZE USER: ${user[0].id} | ${user[0].username}`);
  //     if (user) {
  //       return done(null, user);
  //     }
  //     return done(null, false);
  //   })
  //   .catch(err => done(err));
  return done(null, {id});
});
///////////////////////////////////////////////////////////////////////////
// Passport strategies
passport.use(
  'local',
  new LocalStrategy(function(username, password, done) {
    const db = app.get('db');
    db
      .getUser([username])
      .then(user => {
        if (!user[0]) {
          const hashData = hashPassword.saltHashString(password);
          db.createLocalUser([username, hashData.stringHash, hashData.salt])
            .then((user) => {
              console.log(`Created new user: ${user[0].id} | ${user[0].username}`)
              return done(null, user[0]);
            })
            .catch(err => {
              console.log('Error creating and authenticating local user: ', err);
              if (err) {
                return done(err);
              }})
          // return done(null, false);
        }
        if (
          user[0] &&
          user[0].password_hash !=
          hashPassword.hash(password, user[0].salt).stringHash // salt and hashing password to compare
        ) {
          console.log('Wrong Password!')
          return done(null, false, {message: 'Incorrect Password'});
        }
        if (user[0] && user[0].password_hash == hashPassword.hash(password, user[0].salt).stringHash) {
          let userProfile = user[0];
          delete userProfile.password_hash;
          delete userProfile.salt;
          return done(null, userProfile);
        }
      })
      .catch(err => {
        console.log('Error authenticating local user: ', err);
        if (err) {
          return done(err);
        }
      });
  })
);
passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_REDIRECT_URI
    },
    function(accessToken, refreshToken, profile, done) {
      const db = app.get('db');
      const googleID = 'google|' + profile.id;
      db
        .getUser([googleID])
        .then(user => {
          if (!user[0]) {
            db
              .createGoogleUser([googleID, profile.name.givenName])
              .then(user => {
                console.log(
                  `Created Google user: ${user[0].id} ${user[0].username}`
                );
                return done(null, user[0]);
              })
              .catch(err => {
                console.log('Failed to create Google user: ', err);
                return done(err);
              });
          } else {
            return done(null, user[0]);
          }
        })
        .catch(err => done(err));
    }
  )
);

passport.use(
  'facebook',
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: FACEBOOK_REDIRECT_URI
    },
    function(accessToken, refreshToken, profile, done) {
      
      const db = app.get('db');
      const facebookID = 'facebook|' + profile.id;
      const displayName = profile.displayName.split(" ")[0];
      db
        .getUser([facebookID])
        .then(user => {
          if (!user[0]) {
            db
              .createFacebookUser([facebookID, displayName])
              .then(user => {
                console.log(
                  `Created Facebook user: ${user[0].id} ${user[0].username}`
                );
                return done(null, user[0]);
              })
              .catch(err => {
                console.log('Failed to create Facebook user: ', err);
                return done(err);
              });
          } else {
            return done(null, user[0]);
          }
        })
        .catch(err => done(err));
    }
  )
);
///////////////////////////////////////////////////////////////////////////
// Auth endpoints
// This user controller will have to be modified.
// app.post('/auth/local', passport.authenticate('local'), function(req, res) {
//   res.status(200).send();
// });
app.get(
  '/auth/google',
  passport.authenticate('google', GOOGLE_AUTH_SCOPE),
  function(req, res) {
    res.status(200).send();
  }
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/dashboard', //Will redirect to user dashboard
    failureRedirect: '/'
  })
); // Might need to return the user here

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/dashboard', //Will redirect to user dashboard
    failureRedirect: '/'
  })
);
app.post(
  '/auth/local',
  passport.authenticate('local', {
    // successRedirect: 'http://localhost:3000/dashboard',
    // failureRedirect: '/',
    failureFlash: true
  }), (req, res) => {
    console.log('LOGIN: ', req.user)
    if (req.user) res.send(req.user)
  });
// app.post('/login', usersController.login, (req, res) => console.log(req.user));
// app.post('/register', usersController.createLocalUser);
app.post('/register', passport.authenticate('local', {
  // successRedirect: 'http://localhost:3000/dashboard',
  // failureRedirect: '/',
  failureFlash: true
}), (req, res) => {
  console.log(req)
  if (req.user) res.send(req.user)
  // if (req.user) console.log('poop');
});

app.get('/logout', usersController.logout);


///////////////////////////////////////////////////////////////////////////
// Dashboard Endpoints
app.get('/api/allProjects',projectsController.getAllProjects);
app.get('/api/allTasks', projectsController.getAllTasks);
app.post('/api/addProject', projectsController.addProject);
app.get('/api/allTeamProjects', projectsController.getTeamProjects)
app.post('/api/changeColor', projectsController.changeColor)

///////////////////////////////////////////////////////////////////////////
// Project View Endpoints
app.post('/api/newCard', tasksController.addNewCard)
app.post('/api/newTask', tasksController.addNewTask)
app.get('/api/getAllCards2/:projectID', tasksController.getAllCards2)

app.get('/api/getAllTasks/:projectID', tasksController.getTasks)
app.post('/api/editTask', tasksController.editTask)
app.post('/api/deleteTask', tasksController.deleteTask)
app.post('/api/memberSearch', tasksController.memberSearch)
app.post('/api/addMember', tasksController.addMember)
app.get('/api/groupMembers/:projectId', tasksController.groupMembers)
app.post('/api/assignToTask', tasksController.assignToTask)
app.get('/api/assignedTasks/:projectID', tasksController.assignedTasks)
app.delete('/api/removeUserTask/:memberID/:taskID', tasksController.removeFromTask)
app.delete('/api/deleteProject/:projID', tasksController.deleteProject)

app.post('/api/dragTask', tasksController.dragTask)
app.post('/api/removeCurrentMember', tasksController.removeCurrentMember)

app.put('/api/sendNewTitle/:title/:projectID', tasksController.sendNewTitle)
app.post('/api/changeCardColor', tasksController.changeCardColor)

///////////////////////////////////////////////////////////////////////////
app.post('/api/updateHeader', tasksController.editCardHeader)
app.delete('/api/deleteAllTasks/:cardID', tasksController.deleteAllTasks)
app.delete('/api/deleteCard/:cardID', tasksController.deleteCard)

///////////////////////////////////////////////////////////////////////////
//settings endpoints
app.put('/api/sendNewDisplayName/:displayName', usersController.sendNewDisplayName)

app.put('/api/sendNewEmailName/:email', usersController.sendNewEmailName )

app.put('/api/sendNewBio/:bio',usersController.sendNewBio )

app.get('/api/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json('failure')
  }
 })

 app.get('/api/getUserInfo', usersController.getUserInfo)

///////////////////////////////////////////////////////////////////////////
// More End Points

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socket(server);
// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// })