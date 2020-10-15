const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    // change password
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'movie_rating_app'
})

module.exports = pool