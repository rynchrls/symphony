import axios from "axios";

export const searchQuery = async (query, type = "album") => {
  return await axios.post(`/search/music?query=${query}&type=${type}`);
};
