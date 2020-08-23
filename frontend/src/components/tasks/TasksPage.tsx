import React from 'react'
import {useParams} from 'react-router-dom'
import SecondaryNavbar from '../navbar/SecondaryNav'

interface RouteParams {
  id:string
}

const TasksPage = () => {
const {id} = useParams<RouteParams>()
console.log(id);

  return (
    <div className='r-container'>
    <SecondaryNavbar />
  <h1>TASKS FOR {id}</h1>
  </div>
  )
}

export default TasksPage