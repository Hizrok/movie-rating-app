import React, {useState, useEffect} from 'react'
import AdminItem from './AdminItem'

function AdminList(props) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetch(`/api/${props.category}`)
      const json = await data.json()
      if (props.category === 'movies') {
        setItems(json.map(item => {
          return {
            id: item.id, 
            name: item.title
          }
        }))        
      } else {
        setItems(json.map(item => {
          return {
            id: item.id, 
            name: item.name
          }
        }))        
      }
    }  
    fetchItems()
  }, [])

  return (
    <ul className="list-group mt-3 list-container">
      {
        items.map(item => {
          return (
            <AdminItem key={item.id} id={item.id} category={props.category} item={item} />
          )
        })
      }
    </ul>
  )
}

export default AdminList