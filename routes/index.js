const express = require("express");
const router = express.Router();
const mongoDb = require("../util/db");

// List of all products
router.get("/", (req, res) => {
  try {
    mongoDb.connectDB(err => { // Establish db connection
      if (!err) {
        let db = mongoDb.getDB().db(); // Getting DB
        db.collection("products").find({}).toArray((err, result) => {  // Fetching All Product details
          res.json(result); // Sending response to client
          mongoDb.disconnectDB(); //Close connection
        });
      } else {
        res.status(400).send(err); // Sending error response to client
      }
    });
  } catch (e) {
    res.json({ message: `Error  ${e}` });
  }
});

// Getting particular product details using productId.
router.get("/:id", (req, res) => {
  let prodId = Number(req.params.id); // Getting Product Id
  try {
    mongoDb.connectDB(err => { // Establish db connection
      if (!err) {
        let db = mongoDb.getDB().db(); // Getting DB name
        db.collection("products").findOne({ productId: prodId }, (err, result) => { // Fetching Product details using Product Id
          if (!err) {
            let response = result;
            db.collection("reviews").find({ productId: prodId }).toArray((err, result) => { // Fetching Review details using Product Id
              if (!err) {
                let [review, starValue, resultCount] = [{}, 0, result.length]
                review.reviewCount = resultCount;
                for (let value of result) {
                  starValue += value.starRate;
                }
                resultCount === 0 ? (review.starRate = 0) : (review.starRate = starValue / resultCount);
                response.reviewStatus = review;
                res.json(response); // Sending response to client
                mongoDb.disconnectDB(); //Close connection
              } else {
                res.status(400).send(err);
              }
            });
          } else {
            res.status(400).send(err);
          }
        });
      } else {
        res.status(400).send(err);
      }
    });
  } catch (e) {
    res.json({ message: `${e}` });
  }
});

module.exports = router;
