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
  updateUserInfo: (req, res) => {
    const userId = req.session.user.id;
    const { username, password, displayName, email, bio, imageURL } = req.body;
    const dbInstance = req.app.get('db');

    dbInstance
      .updateUsers([
        userId,
        username,
        password,
        displayName,
        email,
        bio,
        imageURL
      ])
      .then()
      .catch(err => console.log(err));
  },

  updateUserName: (req, res) => {
    console.log(user.id);
    const userId = req.session.user.id;
    const dbInstance = req.app.get('db');
    dbInstance.updateUsers(
      [userId, req.body.newUserName]
        .then(id => res.status(200))
        .catch(err => console.log(err))
    );
  },

  updateEmail: (req, res) => {
    const userId = req.session.user.id;
    const dbInstance = req.app.get('db');
    dbInstance.updateUsers(
      [userId, req.body.newUserEmail].then().catch(err => console.log(err))
    );
  },
  updateBio: (req, res) => {
    const userId = req.session.user.id;
    const dbInstance = req.app.get('db');
    dbInstance.updateUsers(
      [userId, req.body.newUserBio].then().catch(err => console.log(err))
    );
  },

  updateAvatarImage: (req, res) => {
    const userId = req.session.user.id;
    const dbInstance = req.app.get('db');
    dbInstance.updateUsers(
      [userId, req.body.newAvatarImage].then().catch(err => console.log(err))
    );
  }

  // ,
  // delete: (req, res, next) => {

  //   db.registerUser([req.body.username, req.body.password])
  //   .then( () => res.status(200).send())
  //   .catch(() => res.status(500).send())

  // }
};
