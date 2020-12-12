//? Load Modules
require('express-async-errors')
const express = require('express')
const config = require('config')
const winston = require('winston')
const genres = require('./routes/apis/genres.api')
const customers = require('./routes/apis/customers.api')
const movies = require('./routes/apis/movies.api')
const rentals = require('./routes/apis/rentals.api')
const users = require('./routes/apis/users.api')
const auth = require('./routes/apis/auth.api')
const error = require('./middlewares/error.middleware')

//? creating app
const app = express()

//? Settings
const port = process.env.PORT || 3000
if(!config.get('JSONPRIVATEKEY')) {
    console.error('FATAL ERROR : JSONPRIVATEKEY is not defined!!!')
    process.exit(1)
}

//? Middlewares
app.use(express.json())

//? Loggers
winston.add(winston.transports.File, {filename : 'logfile.log'})

//? Handling uncaughtException
process.on('uncaughtException', (ex) => {
    winston.error(ex.message,ex)
})

//? throwing Exception to check 
//!throw new Error(`Error Occured during startup!!!`)

//? Routers 
app.use('/api/genres/', genres)
app.use('/api/customers/', customers)
app.use('/api/movies/', movies)
app.use('/api/rentals/', rentals)
app.use('/api/users/', users)
app.use('/api/auth/', auth)

//? Middlewares to load after Route Handlers
app.use(error)

//? Listener
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`Starting Server at http://127.0.0.1:${port}/`)
})