import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import MovieCard from './MovieCard'

function CardSection (props) {

  const [movies, setMovies] = useState([])

  useEffect(() => {    
    const fetchData = async () => {
      const data = await fetch('/api/movies')
      const json = await data.json()
      setMovies(json.map((movie) => <MovieCard key={movie.id} movie={movie} /> ))
    }
    fetchData()
  }, [])

  return (
    <section className="movie-section">
      <h2 className="section-heading">Top Rated {props.title}</h2>
      <div className="d-flex">
        {movies}
        <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
          <div className="card-body">            
            <div className="btn btn-dark center" style={{width: '100%', height: '100%'}}>
              <Link to='/movies' className='link'>More From This Category</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardSection