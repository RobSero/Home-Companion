import React from 'react'
import TaskCard from './Task'

const TaskList = (props:any) => {

  return (
    <div style={{height: '200px'}}>
      <p>Task Area</p>
      <div className='task-flex-container'>
      {props.members.map((member:any)=> {
      return (
        <div key={member.id} className='task-flex-item'>
          <div className='task-card-header'>
          <h3 className='task-list-name'>{member['first_name']} {member['last_name']}</h3>
            </div>
            <div className='task-list'>
            {props.tasks.map(((task:any) => {
              if(task.assigned_to && task.assigned_to.id === member.id) {
                return <TaskCard members={props.members} task={task} handleComplete={props.handleComplete} handleReassign={props.handleReassign} />
              }
            }))}
          </div>
          </div>
      )
    })}
      </div>
   
    </div>
  )
}

export default TaskList