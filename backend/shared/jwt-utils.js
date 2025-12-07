const jwt = require("jsonwebtoken");

function encodeToken(payload) {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) throw new Error("TOKEN_SECRET is not set");

  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

function decodeToken(token) {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) throw new Error("TOKEN_SECRET is not set");

  return jwt.verify(token, secret);
}

module.exports = { encodeToken, decodeToken };
