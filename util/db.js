const MongoClient = require("mongodb").MongoClient;
const config = require('../config/config');
let _db;

const connectDB = callback => {
  try {
    MongoClient.connect(config.db.env_db_url, (err, client) => { // Establish db connection
      _db = client;
      return callback(err); // return callback parameter.
    });
  } catch (e) {
    console.log(`Error ${e}`);
    return callback(e);
  }
};

const getDB = () => _db; // Assigning DB Connection

const disconnectDB = () => _db.close(); // close connection

module.exports = { connectDB, getDB, disconnectDB }; // exports all method for reuse
