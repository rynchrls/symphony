const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const connectDb = require("./config/dbConfig");
const { default: axios } = require("axios");
const userRoute = require("./route/user.route");
const selectedRoute = require("./route/selected.route");
const searchRoute = require("./route/search.route");
const { getNewAccessToken } = require("./cronjob/access-token");
connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * for cors policy
 */
const corsOpton = {
  origin: process.env.CLIENT_PORT || "http://localhost:3000",
  method: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOpton));

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "connected successfully",
    data: null,
  });
});

// app.get("/refresh_token", function (req, res) {
//   const authOptions = {
//     url: "https://accounts.spotify.com/api/token",
//     method: "POST",
//     headers: {
//       Authorization:
//         "Basic " +
//         Buffer.from(
//           process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
//         ).toString("base64"),
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: "grant_type=client_credentials",
//   };

//   axios(authOptions)
//     .then((response) => {
//       const { access_token, expires_in } = response.data;
//       res.send({ access_token, expires_in });
//     })
//     .catch((error) => {
//       console.error("Error fetching access token", error);
//       res.status(500).send("Error fetching access token");
//     });
// });

getNewAccessToken()

app.use("/user", userRoute);
app.use("/selected", selectedRoute);
app.use("/search", searchRoute);

app.listen(PORT, () => {
  console.log(` The server is running on port: ${PORT}`);
});
