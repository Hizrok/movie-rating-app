import React from 'react'
import {Link} from 'react-router-dom'
import AdminList from './admin/AdminList'


function Admin() {
  return (
    <div className='container text-white'>
      <div className='mb-4'>
        <div className="d-flex justify-content-between align-items-end mt-5">
          <h2>Movies</h2>
          <div className="d-flex">
            <div className="btn btn-dark mr-2">Generate</div>
            <div className="btn btn-dark mr-2">Add</div>
            <div className="md-form mt-0">
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </div>
          </div>
        </div>
        <AdminList category='movies' />
      </div>
      <div className='mb-4'>
        <div className="d-flex justify-content-between align-items-end mt-5">
          <h2>Directors</h2>
          <div className="d-flex">
            <div className="btn btn-dark mr-2">Generate</div>
            <div className="btn btn-dark mr-2"><Link to='/add/directors' className='link'>Add</Link></div>
            <div className="md-form mt-0">
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </div>
          </div>
        </div>
        <AdminList category='directors' />
      </div> 
      <div className='mb-4'>
        <div className="d-flex justify-content-between align-items-end mt-5">
          <h2>Actors</h2>
          <div className="d-flex">
            <div className="btn btn-dark mr-2">Generate</div>
            <div className="btn btn-dark mr-2"><Link to='/add/actors' className='link'>Add</Link></div>
            <div className="md-form mt-0">
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </div>
          </div>
        </div>
        <AdminList category='actors' />
      </div>    
    </div>
  )
}

export default Admin