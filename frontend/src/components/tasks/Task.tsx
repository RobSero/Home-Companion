import React from 'react'

const TaskCard = (props:any) => {
  const date = new Date(props.task.updated_at)
  const assignedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`


  return (
    <div className='task-card'>
      <p>{props.task.description}</p>
      <p>{assignedDate}</p>
      <p>Assigned by: {props.task.creator.first_name}</p>
    </div>
  )
}

export default TaskCard