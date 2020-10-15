import React from 'react'
import PersonForm from './PersonForm'

function EditActor({match}) {
  return (
    <div>
      <PersonForm action='edit' position='actor' id={match.params.id} />
    </div>        
  )
}

export default EditActor