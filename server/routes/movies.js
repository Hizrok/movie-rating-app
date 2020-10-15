const express = require('express')
const router = express.Router()
const pool = require('../db')

// get movies
router.get('/', async (req, res) => {
  const order = [] 
  const values = []

  // search
  let search = req.query.search ? `${decodeURI(req.query.search).split(' ').filter(item => item.length > 0).join('<->')}:*` : ''
  if (search.length > 0) {
    values.push(search)
    search = 'WHERE document @@ to_tsquery( $1 )'
    order.push('ts_rank_cd(document, plainto_tsquery( $1 ))')
  }

  // order
  let rating = req.query.rating ? req.query.rating : ''
  if (rating) {    
    rating = rating === 'worst' ? 'ASC' : 'DESC'
    order.push(`CASE WHEN rating IS NULL THEN 1 ELSE 0 END, rating ${rating}`)
  }

  // age
  let age = req.query.age ? req.query.age : ''
  if (age.length > 0) {
    age = age === 'old' ?  'ASC' : 'DESC'
    order.push(`premiere_date ${age}`)
  }  

  // genres
  let genres = req.query.genres ? req.query.genres : 'all'
  genres = genres === 'all' ? await allGenres() : formatGenres(genres)

  const sql = `
  SELECT id, title, subtitle, premiere_date, rating FROM movies
  RIGHT JOIN
      (
      SELECT DISTINCT ON (movie_id) movies_genres.movie_id, rating, genres.name FROM movies_genres
      LEFT JOIN 
          (
          SELECT movie_id, ROUND(AVG(rating)) AS rating FROM user_reviews GROUP BY movie_id
          ) AS rating_table
      ON movies_genres.movie_id=rating_table.movie_id
      JOIN genres ON movies_genres.genre_id=genres.id
      WHERE genres.name IN (${genres})
      ) AS genre_table
  ON movies.id=genre_table.movie_id
  ${search}
  ${order.length > 0 ? `ORDER BY ${order.join(',')}` : ''};
  ` 
  try {
      const movies = await pool.query({text: sql, values: values})
      res.json(movies.rows)
  } catch (err) {
      console.log(err)
  }
})
// get movie
router.get('/:id', async (req, res) => {
  const sql = 'SELECT * FROM movies WHERE id=$1 LIMIT 1;'
  const values = [req.params.id]
  try {
      const movie = await pool.query(sql, values)
      res.json(movie.rows)
  } catch (err) {
      console.log(err)
  }
})
// add a new movie
// TODO: implement error handeling of the second statements in add and delete
router.post('/', async (req, res) => {
  let sql = "INSERT INTO movies (title, subtitle, premiere_date) VALUES ($1, $2, $3);"  
  let values = [req.body.title, req.body.subtitle, req.body.premiereDate]
  try {
    await pool.query(sql, values)
    sql = "UPDATE movies SET document = to_tsvector( $1 || ' ' || coalesce( $2 , '')) WHERE document IS NULL;"
    values = [req.body.title, req.body.subtitle]
    try {
      await pool.query(sql, values)
    } catch (err) {
      console.log(err)
    }
    res.json({message: 'Successfully added a movie', success: true})
  } catch (err) {
    console.log(err)
    res.json({message: 'Error: new movie not added to the database', success: false})
  }  
})
// edit a movie
router.put('/:id', async (req, res) => {
  let sql = 'UPDATE movies SET title = $1, subtitle = $2, premiere_date = $3 WHERE id = $4;'
  let values = [req.body.title, req.body.subtitle, req.body.premiereDate, req.params.id]
  try {
    await pool.query(sql, values)
    sql = "UPDATE movies SET document = to_tsvector( $1 || ' ' || coalesce( $2 , '')) WHERE id = $3;"
    values = [req.body.title, req.body.subtitle, req.params.id]
    try {
      await pool.query(sql, values)
    } catch (err) {
      console.log(err)
    }
    res.json({message: `Successfully edited a movie with id of ${values[2]}`, success: true})
  } catch (err) {
    console.log(err)
    res.json({message: `Error: movie with id of ${values[2]} not edited`, success: false})
  }  
})
// delete a movie
router.delete('/:id', async (req, res) => {
  const sql = 'DELETE FROM movies WHERE id = $1;'
  const values = [req.params.id]
  try {
    await pool.query(sql, values)
    res.json({message: `Successfully deleted a movie with id of ${values[0]}`, success: true})
  } catch (err) {
    console.log(err)
    res.json({message: `Error: movie with id of ${values[0]} not deleted`, success: false})
  }
})

async function allGenres() {
  let values = []
  let s = ''
  try {
      const movies = await pool.query('SELECT name FROM genres;')
      movies.rows.forEach(item => values.push(`'${item.name}'`))
      s = values.join()
  } catch (err) {
      console.log(err)
  }
  return s
}
function formatGenres(string) {
  let values = []
  string     
      .split(',')
      .forEach(s => values.push(`'${s}'`))      
  return values.join() 
}
function formatSearch(string) {
  string = string.split(' ').filter(word => word != ' ').join('<->')
  console.log(string)
  return `${string}:*`
}

module.exports = router