const crypto = require('crypto');

module.exports = {
  hash: (string, salt) => {
    // Used for validating hashed password
    const hash = crypto.createHmac('sha512', salt); // Hashing using sha512
    console.log('HMAC: ', hash);
    console.log('STRING', string);
    hash.update(string);
    console.log('update: ', hash);
    const value = hash.digest('hex');
    console.log('Value: ', value);
    return {
      salt: salt,
      stringHash: value
    };
  },
  generateSalt: length => {
    return crypto.randomBytes(length).toString('hex'); // generate random salt
  },
  saltHashString: rawString => {
    // rawString would represent a user's plain text password
    const salt = module.exports.generateSalt(16); // generate salt
    console.log('Salt: ', salt);
    const stringData = module.exports.hash(rawString, salt); // salt rawString and hash
    return stringData;
    console.log(stringData);
  }
};
