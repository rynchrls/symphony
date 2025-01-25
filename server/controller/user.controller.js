const { default: axios } = require("axios");
const { getToken } = require("../middleware/helper");

const fetchAlbums = async (req, res) => {
  try {
    const token = await getToken();
    axios
      .get(
        "https://api.spotify.com/v1/search?offset=0&limit=20&query=album&type=album",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) =>
        res.status(200).json({
          message: "successful",
          data: { albums: response.data.albums },
        })
      )
      .catch((err) =>
        res.status(400).json({ message: err.message, data: null })
      );
  } catch (error) {
    res.status(400).json({ message: err.message, data: null });
  }
};

const fetchPlaylist = async (req, res) => {
  try {
    const token = await getToken();
    axios
      .get("https://api.spotify.com/v1/search?q=trending&type=playlist", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) =>
        res.status(200).json({
          message: "successful",
          data: { playlists: response.data.playlists },
        })
      )
      .catch((err) =>
        res.status(400).json({ message: err.message, data: null })
      );
  } catch (error) {
    res.status(400).json({ message: err.message, data: null });
  }
};

const fetchArtist = async (req, res) => {
  try {
    const token = await getToken();
    axios
      .get(
        "https://api.spotify.com/v1/search?offset=0&limit=20&query=artist&type=artist",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) =>
        res.status(200).json({
          message: "successful",
          data: { artists: response.data.artists },
        })
      )
      .catch((err) =>
        res.status(400).json({ message: err.message, data: null })
      );
  } catch (error) {
    res.status(400).json({ message: err.message, data: null });
  }
};

const fetchTrack = async (req, res) => {
  try {
    const token = await getToken();
    axios
      .get(
        `https://api.spotify.com/v1/search?q=trending&type=track&limit=20&offset=0`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) =>
        res.status(200).json({
          message: "successful",
          data: { tracks: response.data.tracks },
        })
      )
      .catch((err) =>
        res.status(400).json({ message: err.message, data: null })
      );
  } catch (error) {
    res.status(400).json({ message: err.message, data: null });
  }
};

const fetchPodcast = async (req, res) => {
  try {
    const token = await getToken();
    axios
      .get(
        `https://api.spotify.com/v1/search?q=trending&type=show&limit=20&offset=0`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) =>
        res.status(200).json({
          message: "successful",
          data: { podcasts: response.data.shows },
        })
      )
      .catch((err) =>
        res.status(400).json({ message: err.message, data: null })
      );
  } catch (error) {
    res.status(400).json({ message: err.message, data: null });
  }
};

module.exports = {
  fetchAlbums,
  fetchPlaylist,
  fetchArtist,
  fetchTrack,
  fetchPodcast,
};
