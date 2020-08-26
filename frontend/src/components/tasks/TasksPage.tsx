import React from 'react'
import {useParams} from 'react-router-dom'
import SecondaryNavbar from '../navbar/SecondaryNav'
import NewTaskInput from './NewTaskInput'
import TaskList from './TaskList'
import {getLocationMembers, getLocationTasks, createTask, completeTask, reassignTask} from '../../lib/api'

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
    getTasks()
  } catch(err){
    console.log(err.response);
    
  }
}

const handleComplete = async (taskId:string) => {
  try {
    await completeTask(taskId)
    console.log('task completed')
    getTasks()
  } catch(err){
    console.log(err.response);
    
  }
}

const handleReassign = async(taskId:string, userId:string) => {
  // console.log(`reassigned to : ${userId}`);
  // console.log(`taks id is : ${taskId}`);
  try {
    const res = await reassignTask(taskId,userId)
    getTasks()
    console.log(res.data);
    
  } catch(err){
    console.log(err.response)
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
  <TaskList members={members} tasks={tasks} handleComplete={handleComplete} handleReassign={handleReassign} />
  </div>
  )
}

export default TasksPage