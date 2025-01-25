const { default: axios } = require("axios");
const { getToken } = require("../middleware/helper");

const search =
  "https://api.spotify.com/v1/search?q=arturnery&type=track,artist,album,playlist,show";

const searchMusic = async (req, res) => {
  try {
    const { query, type = "album" } = req.query;
    const token = await getToken();
    axios
      .get(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) =>
        res.status(200).json({ message: "successful", data: response.data })
      )
      .catch((err) =>
        res.status(400).json({ message: err.message, data: null })
      );
  } catch (error) {
    res.status(400).json({ message: error.message, data: null });
  }
};

module.exports = { searchMusic };
