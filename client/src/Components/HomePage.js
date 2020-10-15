import React from 'react'
import CardSection from './CardSection'

function HomePage() {
  return (
    <div className='container'>
      <CardSection />
      <CardSection title='From Random Genre' />
    </div>
  )
}

export default HomePage