const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  if (!id) return null;
  const tokenid = id._id ? id._id.toString() : id.toString();
  
  return jwt.sign({ id: tokenid }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

module.exports = generateToken;
