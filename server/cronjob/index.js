const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const connectDb = require("../config/dbConfig");
connectDb();

const { getNewAccessToken } = require("./access-token");

getNewAccessToken();
