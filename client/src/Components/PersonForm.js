import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

function PersonForm(params) {
  const [person, setPerson] = useState({
    name: '',
    dateOfBirth: ''
  })
  const history = useHistory();
  useEffect(() => {
    if (params.id) {
      async function fetchPerson(){
        const data = await fetch(`/api/${params.position}s/${params.id}`)
        const json = await data.json()
        let date = new Date(json[0].date_of_birth)
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        setPerson({
          name: json[0].name,
          dateOfBirth: `${dd}/${mm}/${yyyy}`
        })
      }    
      fetchPerson()
    }
  }, [])  

  function handleChange(e) {
    const {name, value} = e.target
    setPerson(prevPerson => {
      return {...prevPerson, [name]: value}
    })  
  }
  function handleSubmit(e) {
    e.preventDefault()
    // data validation
    if (person.name.length !== 0 && person.dateOfBirth !== 0) {
      if (validateDate(person.dateOfBirth)) {  
        console.log(person)      
        async function post() {
          const data = await fetch(`/api/${params.position}s`, {
            method:'POST',
            body: JSON.stringify(person), 
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          const json = await data.json()
          console.log(json.message)
        }
        async function put() {
          const data = await fetch(`/api/${params.position}s/${params.id}`, {
            method:'put',
            body: JSON.stringify(person), 
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          const json = await data.json()
          console.log(json.message)
        }
        if (params.action === 'add') {
          post()          
        } else {
          put()
        }
      }
    }    
    history.push('/admin')
  }
  function validateDate(dateString) {
    const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/
    if (dateString.match(dateFormat)) {
      const date = new Date(dateString)
      if (date !== 'Invalid date') {
        return true
      } else {
        console.log('Invalid date')
      }
    } else {
      console.log('Invalid date format')
    }
    return false
  }

  return (
    <div className="container mt-5" style={{width: '500px', color: 'white'}}>
      <h2 className="mb-2">{params.action.charAt(0).toUpperCase() + params.action.slice(1)} {params.position}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            autoComplete='off'
            className="form-control"  
            placeholder="George Lucas" 
            name='name'
            onChange={handleChange}
            value={person.name}
          />
        </div>
        <div className="form-group">
          <label>Date of birth (day, month, year)</label>
          <input 
            type="text"
            autoComplete='off' 
            className="form-control"
            placeholder="01/01/1977" 
            name='dateOfBirth'
            onChange={handleChange}
            value={person.dateOfBirth}
          />
        </div>
        <button className="btn btn-dark mt-3">{params.action.charAt(0).toUpperCase() + params.action.slice(1)} {params.position}</button>
      </form>
    </div>
  )  
}

export default PersonForm