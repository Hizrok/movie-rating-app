import React from 'react'
import PersonForm from './PersonForm'

function EditDirector({match}) {
  return (
    <div>
      <PersonForm action='edit' position='director' id={match.params.id} />
    </div>        
  )
}

export default EditDirector