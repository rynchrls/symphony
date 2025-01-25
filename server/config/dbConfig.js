/**
 * @module import dependencies
 */
const mongoose = require("mongoose");

/**
 * @access database connectivity
 */
const connectDb = async () => {
  try {
    /**
     * @async database connectiion
     */
    const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);

    if (connect) console.log(`database connected: ${connect.connection.name}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
