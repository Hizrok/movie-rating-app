import React, {useState, useEffect} from 'react'

function MoviePage({match}) {

  const [movie, setMovie] = useState({})
  // const [directors, setDirectors] = useState({})
  // const [actors, setActors] = useState({})

  useEffect(() => {    
    const fetchData = async () => {
      const data = await fetch(`/api/movies/${match.params.id}`)
      const json = await data.json()
      let movie = json[0]
      let date = new Date(movie.premiere_date)
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      movie.premiere_date = `${mm}/${dd}/${yyyy}`
      setMovie(json[0])
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className="container" style={{color: 'white'}}>
        <div className="d-flex mt-5 mb-5">
          <div className="img mr-4"></div>
          <div className="ml-3">
            <h1>{movie.title}</h1>
            <h4 className="mb-3">{movie.subtitle}</h4>
            <p className="mb-1">premiere date: {movie.premiere_date}</p>
            <p>genres:</p>
            <div className="rating">
              <p>100% (1000 reviews)</p>
            </div>
          </div>
        </div>
        <section className="movie-section">
          <h4 className="mb-3">Directed by</h4>
          <div className="d-flex">
            <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
              <div className=" card-img-top img" alt="Card image cap"></div>
              <div className="card-body">
                <h5 className="card-title">George Lucas</h5>
                <h6 className="card-subtitle mb-2">76 years old</h6>
                <div className="btn btn-dark w-100">See more...</div>
              </div>
            </div>
          </div>
        </section>
        <section className="movie-section">
          <h4 className="mb-3">Stars</h4>
          <div className="d-flex">
            <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
              <div className=" card-img-top img" alt="Card image cap"></div>
              <div className="card-body">
                <h5 className="card-title">Hayden Christensen</h5>
                <h6 className="card-subtitle mb-2">as Anakin Skywaler</h6>
                <div className="btn btn-dark w-100">See more...</div>
              </div>
            </div>
            <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
              <div className=" card-img-top img" alt="Card image cap"></div>
              <div className="card-body">
                <h5 className="card-title">Hayden Christensen</h5>
                <h6 className="card-subtitle mb-2">as Anakin Skywaler</h6>
                <div className="btn btn-dark w-100">See more...</div>
              </div>
            </div>
            <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
              <div className=" card-img-top img" alt="Card image cap"></div>
              <div className="card-body">
                <h5 className="card-title">Hayden Christensen</h5>
                <h6 className="card-subtitle mb-2">as Anakin Skywaler</h6>
                <div className="btn btn-dark w-100">See more...</div>
              </div>
            </div>
            <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
              <div className=" card-img-top img" alt="Card image cap"></div>
              <div className="card-body">
                <h5 className="card-title">Hayden Christensen</h5>
                <h6 className="card-subtitle mb-2">as Anakin Skywaler</h6>
                <div className="btn btn-dark w-100">See more...</div>
              </div>
            </div>
            <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
              <div className=" card-img-top img" alt="Card image cap"></div>
              <div className="card-body">
                <h5 className="card-title">Hayden Christensen</h5>
                <h6 className="card-subtitle mb-2">as Anakin Skywaler</h6>
                <div className="btn btn-dark w-100">See more...</div>
              </div>
            </div>          
            <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
              <div className=" card-img-top img" alt="Card image cap"></div>
              <div className="card-body">
                <h5 className="card-title">Hayden Christensen</h5>
                <h6 className="card-subtitle mb-2">as Anakin Skywaler</h6>
                <div className="btn btn-dark w-100">See more...</div>
              </div>
            </div>
            <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
              <div className=" card-img-top img" alt="Card image cap"></div>
              <div className="card-body">
                <h5 className="card-title">Hayden Christensen</h5>
                <h6 className="card-subtitle mb-2">as Anakin Skywaler</h6>
                <div className="btn btn-dark w-100">See more...</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/*
      // TODO: user reviews  
      <div style="width: fit-content; margin: 20px auto;">
        <div className="btn btn-dark">Load more</div>
      </div> 
      */}
    </div>
  )
}

export default MoviePage