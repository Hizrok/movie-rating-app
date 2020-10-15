import React from 'react'
import PersonForm from './PersonForm'

function AddActor() {
  return (
    <PersonForm 
      action='add'
      position='actor'
    />
  )
}

export default AddActor