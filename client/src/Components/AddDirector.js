import React from 'react'
import PersonForm from './PersonForm'

function AddDirector() {
  return (
    <PersonForm 
      action='add'
      position='director'
    />
  )
}

export default AddDirector