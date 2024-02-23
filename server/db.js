//used to configure how we will connect to our database/server.

//create connection pool
const Pool = require('pg').Pool;


//Initalize new pool with parameters (Username, PW, host, port, db we want to connect to)
const pool = new Pool({
    user : "placeholder",
    password : "placeholder",
    host: "localhost",
    port: 5432,
    database: "placeholder"
});

module.exports = pool;
