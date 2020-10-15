const express = require('express')
const router = express.Router()
const pool = require('../db')

// get actors
router.get('/', async (req, res) => {
  try {
      const movies = await pool.query('SELECT * FROM actors;')
      res.json(movies.rows)
  } catch (err) {
      console.log(err)
  }
})
// get actor
router.get('/:id', async (req, res) => {
  const sql = 'SELECT * FROM actors WHERE id=$1 LIMIT 1;'
  const values = [req.params.id]
  try {
      const movie = await pool.query(sql, values)
      res.json(movie.rows)
  } catch (err) {
      console.log(err)
  }
})
// add actor
router.post('/', async (req, res) => {
  const sql = 'INSERT INTO actors (name, date_of_birth) VALUES ($1, $2);'
  const values = [req.body.name, req.body.dateOfBirth]
  try {
    await pool.query(sql, values)
    res.json({message: 'Successfully added an actor', success: true})
  } catch (err) {
    console.log(err)
    res.json({message: 'Error: new actor not added to the database', success: false})
  }
})
// edit actor
router.put('/:id', async (req, res) => {
  const sql = 'UPDATE actors SET name = $1, date_of_birth = $2 WHERE id = $3;'
  const values = [req.body.name, req.body.dateOfBirth, req.params.id]
  try {
    await pool.query(sql, values)
    res.json({message: `Successfully edited an actor with id of ${values[2]}`, success: true})
  } catch (err) {
    console.log(err)
    res.json({message: `Error: actor with id of ${values[2]} not edited`, success: false})
  }
})
// delete actor
router.delete('/:id', async (req, res) => {
  const sql = 'DELETE FROM actors WHERE id = $1;'
  const values = [req.params.id]
  try {
    await pool.query(sql, values)
    res.json({message: `Successfully deleted an actor with id of ${values[0]}`, success: true})
  } catch (err) {
    console.log(err)
    res.json({message: `Error: actor with id of ${values[0]} not deleted`, success: false})
  }
})


module.exports = router