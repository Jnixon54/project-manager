const hashPassword = require('../utils/crypto');

module.exports = {
  createLocalUser: (req, res, next) => {
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
  login: (req, res, next) => {
    const db = req.app.get('db');
    req.session.user = {};
    db
      .getUser([req.body.username, req.body.password])
      .then(result => {
        if (result.length > 0) {
          req.session.user.id = result[0].id;
          req.session.user.username = result[0].username;
          console.log(
            `User logged in: ${req.session.user.id}: ${
              req.session.user.username
            }`
          );
        }
        res.status(200).send(req.session.user);
        // res.redirect('http://localhost:3000/browse');
      })
      .catch(() => res.status(500).send('Unauthorized'));
  },
  logout: (req, res, next) => {
    console.log(req.session);
    req.session.destroy();
    console.log(req.session);
    res.status(200).send(req.session);
  }
  // ,
  // delete: (req, res, next) => {

  //   db.registerUser([req.body.username, req.body.password])
  //   .then( () => res.status(200).send())
  //   .catch(() => res.status(500).send())

  // }
};
