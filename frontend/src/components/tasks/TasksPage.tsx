import React from 'react'
import {useParams} from 'react-router-dom'
import SecondaryNavbar from '../navbar/SecondaryNav'
import NewTaskInput from './NewTaskInput'
import TaskList from './TaskList'
import {getLocationMembers, getLocationTasks, createTask} from '../../lib/api'

interface RouteParams {
  id:string
}

const TasksPage = () => {
const [members, updateMembers] = React.useState([{first_name: 'X', last_name: 'Y'}])
const [tasks, updateTasks] = React.useState([{first_name: 'X', last_name: 'Y'}])
const {id} = useParams<RouteParams>()


const getMembers = async() => {
  try {
    const res = await getLocationMembers(id)
    console.log(res.data)
    updateMembers(res.data.members)
  } catch(err){
    console.log(err);
  }
}

const getTasks = async() => {
  try {
    const res = await getLocationTasks(id)
    console.log(res.data)
    updateTasks(res.data)
  } catch(err){
    console.log(err);
  }
}

const submitNewTask = async(task:object) => {
  console.log(task);
  try {
    const res = await createTask(task, id)
    console.log(res.data)
  } catch(err){
    console.log(err.response);
    
  }
}


React.useEffect(()=> {
  getMembers()
  getTasks()
},[])

  return (
    <div className='r-container'>
    <SecondaryNavbar />
  <NewTaskInput members={members} submitTask={submitNewTask} />
  <TaskList members={members} />
  </div>
  )
}

export default TasksPage