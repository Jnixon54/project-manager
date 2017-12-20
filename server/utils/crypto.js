const crypto = require('crypto');

module.exports = {
  hash: (string, salt) => {
    // Used for validating hashed password
    const hash = crypto.createHmac('sha512', salt); // Hashing using sha512
    hash.update(string);
    const value = hash.digest('hex');
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
    const stringData = module.exports.hash(rawString, salt); // salt rawString and hash
    return stringData;
  }
};
