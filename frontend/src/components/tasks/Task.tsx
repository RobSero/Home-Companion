import React from 'react'
import { CloseCircleOutlined } from '@ant-design/icons';
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
      <p className='task-card-description'>{props.task.description}</p>
      
      <CloseCircleOutlined className='task-card-delete' onClick={()=>{
        props.handleComplete(props.task.id)
      }} />
      <p className='task-card-date'>{assignedDate}</p>
      <p className='task-card-assigned'>Assigned by: {props.task.creator.first_name}</p>
     
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