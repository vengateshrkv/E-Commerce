const express = require("express");
const router = express.Router();
const MongoDB = require('../util/db')

// List of all products
router.get("/", (req, res) => {
    try {
        MongoDB.connectDB((err) => {
            // if (err) console.log(err);
            const db = MongoDB.getDB();
            db.db().collection('products').
                find({}).toArray((err, result) => {
                    if (result !== null) {
                        res.json(result);
                    } else {
                        res.send("Data Not Found");
                    }
                    //Close connection
                    MongoDB.disconnectDB();
                });
        });
    } catch (e) {
        res.json({ message: "Error" });
    }

});

// Getting particular product details using productId.
router.get("/:id", (req, res) => {
    let prodId = Number(req.params.id);
    try {
        MongoDB.connectDB((err) => {
            console.log(err);
            // if (err) console.log(err);
            const db = MongoDB.getDB();
            db.collection("products").findOne({ productId: prodId }, (err, result) => {
                if (result !== null) {
                    let response = result;
                    db.collection("reviews").find({ productId: prodId }).toArray((err, result) => {
                        if (!err) {
                            let review = {};
                            let starValue = 0;
                            let resultCount = result.length;
                            review.reviewCount = resultCount;
                            for (let value of result) {
                                starValue += value.starRate;
                            }
                            resultCount === 0 ? review.starRate = 0 : review.starRate = starValue / resultCount;
                            response.reviewStatus = review;
                            res.json(response);
                        } else {
                            res.status(400).send(err);
                        }
                        //Close connection
                        MongoDB.disconnectDB();
                    });
                } else {
                    res.status(400).send("Data Not Found");
                }
            });
        });
    }
    catch (e) {
        res.json({ message: "Error" });
    }
});

module.exports = router;