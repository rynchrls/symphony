const { findToken } = require("../model");

const getToken = async () => {
  const token = await findToken();
  return token[0]?.access_token;
};

module.exports = { getToken };
