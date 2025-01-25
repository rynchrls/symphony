const { default: axios } = require("axios");
const { getToken } = require("../middleware/helper");


const fetchSelected = async (req, res) => {
  try {
    const { href } = req.query;
    const token = await getToken();
    axios
      .get(`${href}`, {
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
    res.status(400).json({ message: err.message, data: null });
  }
};

module.exports = {
  fetchSelected,
};
