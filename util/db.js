const MongoClient = require('mongodb').MongoClient;

// DB configuration path
const url = 'mongodb://localhost:27017/ecommerce';
let _db;

const connectDB = (callback) => {
    try {
        MongoClient.connect(url, (err, client) => {
            _db = client;
            return callback(err);
        })
    } catch (e) {
        console.log(`Error ${e}`);
    }
}

const getDB = () => _db

const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }