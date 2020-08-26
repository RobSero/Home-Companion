import React from 'react'

const TaskCard = (props:any) => {
  console.log('MEMBERS BELOW');
  
  console.log(props.members);
  
  const date = new Date(props.task.updated_at)
  const assignedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`


  const taskReassign = ({target: {value}}:any) => {
      props.handleReassign(props.task.id, value)
  }

  return (
    <div className='task-card'>
      <p>{props.task.description}</p>
      <p>{assignedDate}</p>
      <p>Assigned by: {props.task.creator.first_name}</p>
      <button onClick={()=>{
        props.handleComplete(props.task.id)
      }}>Y</button>
       <select name='reassign' required defaultValue='def' onChange={taskReassign}>
        <option value='def'>Reassign To</option>
        {props.members.map((member:any) => {
          return (<option key={member.id} value={member.id}>{`${member.first_name} ${member.last_name}`}</option>)
        })}
        
      </select>
    </div>
  )
}

export default TaskCard