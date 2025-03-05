const jwt = require("jsonwebtoken");
require("dotenv/config");

const generateToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.Secret_Code);
  return token;
};

module.exports = generateToken;
