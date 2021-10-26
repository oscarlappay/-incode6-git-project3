const pgp = require('pg-promise')()

// Connection string
const cn = 'postgres://postgres:12345678@localhost:5432/mrcoffee_db'

// Create a new database instance
const db = pgp(cn)

module.exports = db 