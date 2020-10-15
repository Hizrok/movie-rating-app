import React from 'react'
import {Link} from 'react-router-dom'

function Card (props) {

  let color = '#ebd13d'
  if (props.movie.rating) {
    if (props.movie.rating >= 80) {
      color = '#1a9b1a'
    } else if (props.movie.rating <= 50) {
      color = '#da2f2f'
    }
  }  

  return (
    <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
      <div className=" card-img-top img" alt="Card image cap"></div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2">rating: <span style={{color: color}}>{props.movie.rating === null ? 'Not rated' : `${props.movie.rating}%`}</span></h6>
        <h5 className="card-title">{props.movie.title}</h5>
        <h6 className="card-subtitle mb-2">{props.movie.subtitle}</h6>
        <div className="btn btn-dark" style={{width: '100%'}}>          
          <Link to={`/movies/${props.movie.id}`} className='link'>See more...</Link>
        </div>
      </div>
    </div>
  )
}

export default Card