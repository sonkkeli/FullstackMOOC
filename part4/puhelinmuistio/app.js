const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

// MORGANIN KONFIGUROINTI
app.use(morgan((tokens, req, res) => {
    morgan.token('data', ((req, res) => { return JSON.stringify(req.body) }))
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.data(req, res)
    ].join(' ')
}))

app.use(cors())

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app