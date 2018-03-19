const express = require("express");
const app = express();

app.use("/products", require("./routes/index"));
app.listen("3000", "10.100.110.131", () => { });

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.send(err.status, err.message);
});