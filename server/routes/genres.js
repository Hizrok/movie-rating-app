const express = require('express')
const router = express.Router()
const pool = require('../db')

// get genres
router.get('/', async (req, res) => {
  try {
      const movies = await pool.query('SELECT * FROM genres;')
      res.json(movies.rows)
  } catch (err) {
      console.log(err)
  }
})

module.exports = router