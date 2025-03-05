const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv/config");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.Secret_Code);
      req.user = await User.findOne({ email: decoded.id }).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ success: false, message: "Not Authorized" });
    }
  }

  if (!token) {
    res.status(401).send({ sucess: false, message: "Not Authorized" });
  }
};

module.exports = { protect };
