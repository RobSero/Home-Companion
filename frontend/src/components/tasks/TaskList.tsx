import React from 'react'


const TaskList = (props:any) => {

  return (
    <div style={{height: '200px', backgroundColor: 'pink'}}>
      <p>Task Area</p>
    {props.members.map((member:any)=> {
      return (
        <div key={member.id} style={{height: '400px', backgroundColor: 'green', width: '20%'}}>
          <p>{member['first_name']} {member['last_name']}</p>
          </div>
      )
    })}
    </div>
  )
}

export default TaskList