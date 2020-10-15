import React from 'react'
import {Link} from 'react-router-dom'

function Card(props) {
  return (
    <div className="card text-white bg-dark mr-4 flex-shrink" style={{width: '210px', overflow: 'hidden'}}>
      <div className=" card-img-top img" alt="Card image cap"></div>
      <div className="card-body">
        <h5 className="card-title">{props.person.first_name} {props.person.last_name}</h5>
        <h6 className="card-subtitle mb-2">76 years old</h6>
        <div className="btn btn-dark w-100">
          <Link to={`/directors/${props.person.id}`} className='link'>See more...</Link>
        </div>
      </div>
    </div>
  )
}

export default Card