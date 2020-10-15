import React, {useState, useEffect} from 'react'
import MovieCard from './MovieCard'

function MoviesPage() {

  const [movies, setMovies] = useState([])
  const [filters, setFilters] = useState({
    ratingCheck: false,
    rating: '',
    ageCheck: false,
    age: '',
    genresCheck: false,
    genres: 'all',
    search: ''
  })
  const [genres, setGenres] = useState([])

  useEffect(() => {  
    const fetchGenres = async () => {
      const data = await fetch(`/api/genres`)
      const json = await data.json()
  
      const fetchedData = [] 
      json.forEach(genre => {
        fetchedData.push({
          id: genre.id,
          name: genre.name,
          enabled: false
        })
      });
  
      setGenres(fetchedData)
    }  
    fetchGenres()
  }, [])
  useEffect(() => {   
    const fetchMovies = async () => {
      const search = filters.search.length > 0 ? `search=${encodeURIComponent(filters.search.trim())}` : ''
      const rating = filters.rating.length > 0  && filters.ratingCheck ? `rating=${encodeURIComponent(filters.rating)}` : ''
      const age = filters.age.length > 0 && filters.ageCheck ? `age=${encodeURIComponent(filters.age)}` : ''
      const selectedGenres = genres.filter(genre => genre.enabled === true).map(genre => genre.name);
      const selectedGenresToString = filters.genresCheck && selectedGenres ? selectedGenres.join(',') : ''
      const genresQuery = filters.genresCheck ? `genres=${encodeURIComponent(selectedGenresToString)}` : ''
  
      let query = `${search} ${rating} ${age} ${genresQuery}`
      if (query.length > 3) {
        query = `?${query.split(' ').filter(item => item.length > 0).join('&')}`
      }
      const data = await fetch(`/api/movies${query}`)
      const json = await data.json()
      setMovies(json.map((movie) => {
        return (
          <div key={movie.id} className="col-12 col-lg-3 col-md-4 d-flex justify-content-center mb-5">
            <MovieCard key={movie.id} movie={movie} />
          </div>
        )
      }))
    } 
    fetchMovies()
  }, [filters, genres])
  
  function handleChange (e) {
    const {name, value, type, checked} = e.target
    if (type === 'checkbox') {
      setFilters(prevFilters => {
        return {...prevFilters, [name]: checked}
      })
    } else {
      setFilters(prevFilters => {
        return {...prevFilters, [name]: value}
      })
    }
  }
  function handleGenres (e) {
    const {name} = e.target     
    setGenres(prevGenres => {
      const genresIndex = prevGenres.findIndex(genre => genre.name === name)      
      let updatedGenres = [
        ...prevGenres.slice(0, genresIndex),
        Object.assign({}, prevGenres[genresIndex], {
          id: prevGenres[genresIndex].id,
          name: prevGenres[genresIndex].name,
          enabled: !prevGenres[genresIndex].enabled
        }),
        ...prevGenres.slice(genresIndex+1)
      ]
      return updatedGenres
    })
  }

  return(
    <div>
      <div style={{margin: '50px auto', maxWidth: '500px', width: '80%'}}>
        <input 
          className="form-control mr-2"             
          type="text" 
          autoComplete='off'
          placeholder="Search for a movie" 
          name="search" 
          value={filters.search} 
          onChange={handleChange} 
        />
        <div className="row mt-2" style={{color: 'white'}}>
          <div className="col-6 col-md-3">
            <form>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  name='ageCheck' 
                  onChange={handleChange} 
                  value={filters.ageCheck}
                />
                <label className="form-check-label"><b>Age</b></label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="age" 
                  value="new"
                  onChange={handleChange}
                  checked={filters.age === 'new'}
                  disabled={!filters.ageCheck}
                />
                <label className="form-check-label">Newest</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="age" 
                  value="old"
                  onChange={handleChange}
                  checked={filters.age === 'old'}
                  disabled={!filters.ageCheck}
                />
                <label className="form-check-label">Oldest</label>
              </div>
            </form>
          </div>
          <div className="col-6 col-md-3">
            <form>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  name='ratingCheck' 
                  onChange={handleChange} 
                  value={filters.ratingCheck}
                />
                <label className="form-check-label"><b>Rating</b></label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="rating" 
                  value="best"
                  onChange={handleChange}
                  checked={filters.rating === 'best'}
                  disabled={!filters.ratingCheck}
                />
                <label className="form-check-label">Best rated</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="rating" 
                  value="worst"
                  onChange={handleChange}
                  checked={filters.rating === 'worst'}
                  disabled={!filters.ratingCheck}
                />
                <label className="form-check-label">Worst rated</label>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-5">        
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                name='genresCheck' 
                onChange={handleChange} 
                value={filters.genresCheck}
              />
              <label className="form-check-label"><b>Genres</b></label>
            </div>
            {
              genres.map(genre => {
                return (
                  <div key={genre.id} className="form-check form-check-inline">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name={`${genre.name}`} 
                      onChange={handleGenres} 
                      value={genre.enabled}
                      disabled={!filters.genresCheck}
                    />
                    <label className="form-check-label">{`${genre.name}`}</label>
                  </div>  
                )
              })
            }                      
          </div>
        </div>
      </div>      
      <div className="container">
        <div className="row">
          {movies}
        </div>
      </div>
      <div style={{width: 'fit-content', margin: '20px auto'}}>
        <div className="btn btn-dark">Load more</div>
      </div>
    </div>
  )
}

export default MoviesPage