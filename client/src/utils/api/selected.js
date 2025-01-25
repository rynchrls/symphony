import axios from "axios";

export const selected = async (href) => {
  return await axios.get(`/selected?href=${href}`);
};
