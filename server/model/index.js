const Token = require("./refreshToken.schema");

const newToken = async ({ access_token, expiration_date }) => {
  return await Token.create({
    access_token,
    expiration_date,
  });
};

const updateToken = async (where, update, isReturn) => {
  return await Token.findOneAndUpdate(where, update, isReturn);
};

const findToken = async () => {
  return await Token.find();
};

module.exports = { newToken, updateToken, findToken };
