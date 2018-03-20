const app = require('express')();
const MongoDB = require("./util/db");

app.use('/products', require('./routes/index'));

// Assingning Server Port
app.listen('3000', '10.100.110.131', () => { });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404; // Error status
  next(err); // Forward error message to error Handler
});

// error handler
app.use((err, req, res) => {
  res.status(err.status).send(err.message); // Sending error response to client
});
