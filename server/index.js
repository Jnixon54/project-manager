const { PORT, DB_CONN_STRING } = require('../.config');
const express = require('express');
const { json } = require('body-parser');
const cors = require ('cors');
const massive = require ('massive');
const session = require ('express-session');
const usersController = require('./controllers/users_controller');


const app = express();
app.use(json()); //Must come before cors
app.use(cors());

massive(DB_CONN_STRING)
  .then(dbInstance => {app.set('db', dbInstance)})
  .catch(console.log)

app.use(session({ 
  secret: 'placeholder',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));
///////////////////////////////////////////////////////////////////////////
// Login endpoints
// This user controller will have to be modified.
app.post('/api/auth/login', usersController.login)
app.post('/api/auth/register', usersController.create)
app.post('/api/auth/logout', usersController.logout)

///////////////////////////////////////////////////////////////////////////
// More End Points

///////////////////////////////////////////////////////////////////////////
// More End Points



app.listen(PORT, () => { console.log(`Listening on port ${PORT}`)})
  