const cron = require("node-cron");
const moment = require("moment");
const { updateToken, findToken } = require("../../model");
const { default: axios } = require("axios");

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

const getNewAccessToken = async () => {
  // Set up the cron job to run every 50 minutes
  cron.schedule("*/45 * * * *", () => {
    refreshAccessToken();
  });
};

const refreshAccessToken = async () => {
  const token = await findToken();
  const newTime = moment().add(1, "hours");
  axios(authOptions)
    .then(async (response) => {
      const { access_token, expires_in } = response.data;
      await updateToken(
        { _id: token[0]?._id },
        { access_token, expiration_date: newTime },
        { new: true }
      );
      console.log('token updated!')
    })
    .catch((error) => {
      console.log("Error fetching access token", error.message);
    });
};

module.exports = {
  getNewAccessToken,
};
