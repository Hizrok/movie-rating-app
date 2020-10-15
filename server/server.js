const express = require('express')
const movies = require('./routes/movies')
const directors = require('./routes/directors')
const actors = require('./routes/actors')
const genres = require('./routes/genres')

const app = express()
const PORT = 3001

app.use(express.json())

app.use('/api/movies', movies)
app.use('/api/directors', directors)
app.use('/api/actors', actors)
app.use('/api/genres', genres)

app.listen(PORT)