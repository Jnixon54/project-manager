const { PORT, DB_CONN_STRING } = require('../.config');
const express = require('express');
const { json } = require('body-parser');
const cors = require ('cors');
const massive = require ('massive');
const session = require ('express-session');
const usersController = require('./controllers/usersController');


const app = express();
app.use(json()); //Must come before cors
app.use(cors());

massive(DB_CONN_STRING)
  .then(dbInstance => {app.set('db', dbInstance)})
  .catch(console.log)

app.use(session({ 
  secret: 'flippy nips',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));
///////////////////////////////////////////////////////////////////////////
// Login endpoints
app.post('/api/auth/login', usersController.login)
app.post('/api/auth/register', usersController.create)
app.post('/api/auth/logout', usersController.logout)

///////////////////////////////////////////////////////////////////////////
// Book Endpoints
app.post('/api/library', booksController.create);
app.get('/api/library', booksController.getAll);
app.delete('/api/library/:id', booksController.delete);
// app.get('/api/library/query', booksController.getQuery);

///////////////////////////////////////////////////////////////////////////
// Rental Endpoints
app.put('/api/library/rental/:bookID', rentalController.updateBookRentalStatus);
app.get('/api/library/rental/:userID', rentalController.getBooksByRentalID);


app.listen(PORT, () => { console.log(`Listening on port ${PORT}`)})
  