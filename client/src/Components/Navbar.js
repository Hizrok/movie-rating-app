import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">        
        <Link to='/' className='navbar-brand link'>MovieDemo</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to='/' className='nav-link link'>Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to='/movies' className='nav-link link'>Movies</Link>
            </li>
            <li className="nav-item">
              <Link to='/directors' className='nav-link link'>Directors</Link>
            </li>
            <li className="nav-item">
              <Link to='/actors' className='nav-link link'>Actors</Link>
            </li>
          </ul>
          <ul className="navbar-nav my-2 my-lg-0">
            <li className="nav-item">
              <Link to='/login' className='nav-link link'>Login</Link>
            </li>
            <li className="nav-item">
              <Link to='/register' className='nav-link link'>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar