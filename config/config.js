const hostId = require("ip").address();

module.exports = {
    app: {
        env_server_port: "3000",
        env_host: hostId
    },
    db: {
        env_db_url: "mongodb://10.100.110.131:27017/ecommerce"
    }
}