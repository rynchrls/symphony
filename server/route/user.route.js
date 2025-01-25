const express = require("express").Router();
const userRoute = express;

const {
  fetchAlbums,
  fetchPlaylist,
  fetchArtist,
  fetchTrack,
  fetchPodcast,
} = require("../controller/user.controller");

userRoute.get("/album", fetchAlbums);
userRoute.get("/playlist", fetchPlaylist);
userRoute.get("/artist", fetchArtist);
userRoute.get("/track", fetchTrack);
userRoute.get("/podcast", fetchPodcast);

module.exports = userRoute;
