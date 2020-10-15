import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function AdminItem(params) {
  const [check, setCheck] = useState(true)
  function handleClick(e) {
    async function deleteItem() {
      const data = await fetch(`/api/${params.category}/${params.id}`, {
        method:'delete'
      })
      const json = await data.json()
      console.log(json.message)
      if (json.success) {
        setCheck(false)
      }
    }
    deleteItem()
  }

  return (    
    <div>
      {check && <Item item={params.item} id={params.id} category={params.category} handleClick={handleClick} />}
    </div>
  )
}

function Item(params) {
  return (
    <li className="list-group-item list-group-item-dark">
      <div className="d-flex justify-content-between align-items-end">
        <h5>{params.item.name}</h5>
        <div className="d-flex align-items-end">
          <div className="btn btn-primary mr-2"><Link to={`/edit/${params.category}/${params.id}`} className='link'>Edit</Link></div>
          <div className="btn btn-danger" onClick={params.handleClick}>Delete</div>
        </div>
      </div>
    </li>
  )
}

export default AdminItem