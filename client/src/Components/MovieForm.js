import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";

function MovieForm(params) {  
  const history = useHistory();
  const [movie, setMovie] = useState({
    title: '',
    subtitle: '',
    premiereDate: ''
  })

  function handleMovieChange(e) {
    const {name, value} = e.target
    setMovie(prevMovie => {
      return {...prevMovie, [name]: value}
    })
  }
  function handleSubmit(e) {
    e.preventDefault()
    // data validation
    // TODO: add/edit movie (remove false)
    if (false && movie.title.length !== 0 && movie.premiereDate !== 0) {
      if (validateDate(movie.premiereDate)) {  
        console.log(movie)      
        async function post() {
          const data = await fetch(`/api/movies`, {
            method:'POST',
            body: JSON.stringify(movie), 
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          const json = await data.json()
          console.log(json.message)
        }
        async function put() {
          const data = await fetch(`/api/movies/${params.id}`, {
            method:'put',
            body: JSON.stringify(movie), 
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          const json = await data.json()
          console.log(json.message)
        }
        if (params.action === 'add') {
          post()          
        } else {
          put()
        }
      }
    }
    // TODO: add new directors and actors
    // TODO: add new connections to movies_directors and movies_actors    
    // redirect
    history.push('/admin')
  }
  function validateDate(dateString) {
    const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/
    if (dateString.match(dateFormat)) {
      const date = new Date(dateString)
      if (date !== 'Invalid date') {
        return true
      } else {
        console.log('Invalid date')
      }
    } else {
      console.log('Invalid date format')
    }
    return false
  }

  return (
    <div className="container mt-5" style={{width: '800px', color: 'white'}}>
      <h2 className="mb-2">Add movie</h2>
      <form className='mb-5' onSubmit={handleSubmit}>
        {/* movie form */}
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            className="form-control"  
            placeholder="Star Wars"
            autoComplete='off'
            name='title'
            onChange={handleMovieChange}
            value={movie.title}
          />
        </div>
        <div className="form-group">
          <label>Subtitle</label>
          <input 
            type="text" 
            className="form-control"  
            placeholder="Revenge of the Sith"
            autoComplete='off'
            name='subtitle'
            onChange={handleMovieChange}
            value={movie.subtitle} 
          />
        </div>
        <div className="form-group">
          <label>Premiere date</label>
          <input 
            type="text" 
            className="form-control"  
            placeholder="01/01/1977"
            autoComplete='off'
            name='premiereDate'
            onChange={handleMovieChange}
            value={movie.premiereDate} 
          />
        </div>
        
        {/* TODO: director form */}
        <div className="d-flex">
          <div className="w-50 mr-1" style={{position: 'relative'}}>
            <div className="form-group">
              <label>Search for a director</label>
              {/* TODO: director search input */}
              <input 
                type="text" 
                className="form-control" 
                placeholder="George Lucas" 
              />
            </div>
            {/* TODO: director search results */}
            <div className="search-results">
              <div className="search-result">
                <p>George Lucas</p>
                <div className="btn btn-dark">Add</div>
              </div>
            </div>
          </div>
          
          {/* TODO: new director form */}
          <div className="w-50 ml-1 mb-2">
            <div className="form-group">
              <label>Add a new director</label>
              {/* TODO: new director name input */}
              <input 
                type="text" 
                className="form-control"
                placeholder="George Lucas" 
              />
            </div>
            <div className="form-group">
              <label>Birth date</label>
              {/* TODO: new director dateOfBirth */}
              <input 
                type="text" 
                className="form-control"
                placeholder="George Lucas" 
              />
            </div>
            {/* TODO: add new director button */}
            <div className="btn btn-dark">Add director</div>
          </div>
        </div>

        {/* TODO: current directors list */}
        <ul className="list-group mb-2">
          <li className="list-group-item list-group-item-dark">Directors</li>
          <li className="list-group-item list-group-item-dark">
            <div className="list-item d-flex justify-content-between align-items-center">
              <p style={{margin: 0}}>George Lucas</p>
              {/* TODO: remove directors from the list button */}
              <div className="btn btn-danger">Remove</div>
            </div>
          </li>
        </ul>

        {/* TODO: actor form */}
        <div className="d-flex">
          <div className="w-50 mr-1" style={{position: 'relative'}}>
            <div className="form-group">
              <label>Search for an actor</label>
              {/* TODO: actor search input */}
              <input 
                type="text" 
                className="form-control" 
                placeholder="George Lucas" 
              />
            </div>
            {/* TODO: actor search results */}
            <div className="search-results">
              <div className="search-result">
                <p>George Lucas</p>
                <div className="btn btn-dark">Add</div>
              </div>
            </div>
          </div>
          <div className="w-50 ml-1 mb-2">
            <div className="form-group">
              <label>Add a new actor</label>
              {/* TODO: new actor name input */}
              <input 
                type="text" 
                className="form-control"
                placeholder="George Lucas" 
              />
            </div>
            <div className="form-group">
              <label>Birth date</label>
              {/* TODO: new actor name input */}
              <input
                type="text" 
                className="form-control"
                placeholder="George Lucas" 
              />
            </div>
            {/* TODO: add new actor button */}
            <div className="btn btn-dark">Add actor</div>
          </div>
        </div>
        {/* TODO: current actors list */}
        <ul className="list-group mb-2">
          <li className="list-group-item list-group-item-dark">Actors</li>
          <li className="list-group-item list-group-item-dark">
            <div className="list-item d-flex justify-content-between align-items-center">
              <p style={{margin: 0}}>George Lucas</p>
              {/* TODO: remove actors from the list button */}
              <div className="btn btn-danger">Remove</div>
            </div>
          </li>
        </ul>
        <div className="btn btn-dark mt-3">Add movie</div>
      </form>
    </div>
  )
}

export default MovieForm