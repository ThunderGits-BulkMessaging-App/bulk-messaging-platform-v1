const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv/config");

const protect = async (req, res, next) => {
  console.log("protect middleware called");
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.Secret_Code);
      req.user = await User.findOne({ email: decoded.id }).select("-password"); // Make sure 'id' should be your user identifier in JWT payload
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: "Not Authorized" });
    }
  } else {
    res.status(401).send({ message: "Not Authorized, token missing" });
  }
};


module.exports = { protect };
