const bcrypt = require("bcryptjs");

function encodePassword(plainPassword) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
}

function matchPassword(plainPassword, hashedPassword) {
  if (!plainPassword || !hashedPassword) return false;
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = { encodePassword, matchPassword };
