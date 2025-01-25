const { findToken } = require("../model");

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  method: "POST",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(
        process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
      ).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: "grant_type=client_credentials",
};

axios(authOptions)
  .then((response) => {
    const { access_token, expires_in } = response.data;
    res.send({ access_token, expires_in });
  })
  .catch((error) => {
    console.error("Error fetching access token", error);
    res.status(500).send("Error fetching access token");
  });

const refreshToken = async () => {
  try {
    const isSaved = await findToken();
    if (isSaved?.length < 1 || !isSaved) {
    }
  } catch (error) {}
};

const options = (refresh_token) => {};

module.exports = { refreshToken };
