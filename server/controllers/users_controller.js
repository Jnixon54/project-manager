const hashPassword = require('../utils/crypto');
const axios = require('axios');

module.exports = {
  createLocalUser: (req, res) => {
    // console.log('BODY: ', req.body);
    const db = req.app.get('db');
    const hashData = hashPassword.saltHashString(req.body.password);
    req.session.user = {};
    db
      .createLocalUser([req.body.username, hashData.stringHash, hashData.salt])
      .then(data => {
        req.session.user.id = data[0].id;
        req.session.user.username = data[0].username;
        console.log(
          'Created new user: ',
          `${req.session.user.id}: ${req.session.user.username}`
        );

        res.status(200).send(req.session.user);
      })
      .catch(err => {
        if (err.code == 23505) {
          console.log('User could not be created, username in use.');
          res.send(500, {
            error: 'Username in use.'
          });
        } else {
          res.status(500).send(err);
        }
      });
  },
  getUserInfo: (req, res) => {
    const dbInstance = req.app.get('db');
    console.log("hit")
    dbInstance
      .getUserInfo([req.user.id])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
    
  },
  // login: (req, res, next) => {
  //   const db = req.app.get('db');
  //   req.session.user = {};
  //   db
  //     .getUser([req.body.username])
  //     .then(user => {
  //       if (user.length > 0) {
  //         if(user[0].password_hash == hashPassword.hash(req.body.password, user[0].salt).stringHash){
  //           req.session.user.id = user[0].id;
  //           req.session.user.username = user[0].username;
  //           console.log(
  //             `User logged in: ${req.session.user.id}: ${
  //               req.session.user.username
  //             }`
  //           );
  //         next();
  //         } else {
  //           console.log('Login Failed. Redirecting...')
  //           res.redirect('/');
  //           return;
  //         }
  //       }
  //       res.status(200).send(req.session.user);
  //       // res.redirect('http://localhost:3000/browse');
  //     })
  //     .catch(() => res.status(500).send('Unauthorized'));
  // },
  logout: (req, res) => {
    console.log('User logged out: ', req.session.passport.user);
    req.session.destroy();
    res.redirect('/');
  },

  sendNewDisplayName: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("hit")
    dbInstance
      .sendNewDisplayName([req.params.displayName, req.session.passport.user])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },

  sendNewEmailName: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .sendNewEmailName([req.params.email, req.session.passport.user])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },
  sendNewBio: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .sendNewBio([req.params.bio, req.session.passport.user])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  }

  
  
  // ,
  // delete: (req, res, next) => {

  //   db.registerUser([req.body.username, req.body.password])
  //   .then( () => res.status(200).send())
  //   .catch(() => res.status(500).send())

  // }
};
