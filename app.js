const app = require('express')();
const config = require('./config/config.js');
const hostId = require("ip").address();


// Start the app by listening on port 
app.listen(config.env_server_port, hostId, () => { });

// routes
app.use('/products', require('./routes/index'));

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
