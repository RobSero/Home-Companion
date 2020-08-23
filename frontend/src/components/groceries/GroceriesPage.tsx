import React from 'react'
import {useParams} from 'react-router-dom'
import SecondaryNavbar from '../navbar/SecondaryNav'

interface RouteParams {
  id:string
}

const GroceriesPage = () => {
const {id} = useParams<RouteParams>()
console.log(id);

  return (
    <div className='r-container'>
    <SecondaryNavbar />
  <h1>Groceries FOR {id}</h1>
  </div>
  )
}

export default GroceriesPage