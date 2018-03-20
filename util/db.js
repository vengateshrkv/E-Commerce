const MongoClient = require("mongodb").MongoClient;

// DB configuration
const url = "mongodb://localhost:27017/ecommerce";
let _db;

const connectDB = callback => {
  try {
    MongoClient.connect(url, (err, client) => { // Establish db connection
      _db = client;
      return callback(err); // return callback parameter.
    });
  } catch (e) {
    console.log(`Error ${e}`);
  }
};

const getDB = () => _db; // Assigning DB Connection

const disconnectDB = () => _db.close(); // close connection

module.exports = { connectDB, getDB, disconnectDB }; // exports all method for reuse
