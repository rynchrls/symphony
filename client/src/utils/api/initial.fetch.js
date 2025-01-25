import axios from "axios";

export const fetchInitialAlbum = async () => {
  return await axios.get("/user/album");
};

export const fetchInitialPlaylist = async () => {
  return await axios.get("/user/playlist");
};

export const fetchInitialArtist = async () => {
  return await axios.get("/user/artist");
};

export const fetchInitialTrack = async () => {
  return await axios.get("/user/track");
};

export const fetchInitialPodcast = async () => {
  return await axios.get("/user/podcast");
};
