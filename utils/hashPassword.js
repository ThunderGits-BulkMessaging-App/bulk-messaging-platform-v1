const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(9);
  const pwd = await bcrypt.hashSync(password, salt);
  return pwd;
};
