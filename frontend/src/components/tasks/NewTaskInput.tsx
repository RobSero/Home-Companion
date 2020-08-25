import React from 'react'
import { Modal, Button, Input, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const {Option} = Select

const NewTaskInput = (props:any) => {
  const [taskData, updateInput] = React.useState({
    description: '',
    assigned_to: null,
    private: true
  })


  const taskInput = ({target: {name,value}}:any) => {
    if(name != 'private'){
      updateInput({
        ...taskData,
        [name]: value
      })
    }
    else {
      updateInput({
        ...taskData,
        [name]: value == '0' ? true : false
      })
    }
  }

  const handleSubmit = (e:any) => {
    e.preventDefault(); 
    if (taskData.description && taskData.assigned_to){
      props.submitTask(taskData)
    }
  }


  return (
    <div style={{height: '150px', backgroundColor: 'aqua'}}>
      <p>new task info here</p>
      <form onSubmit={(e)=>{handleSubmit(e)}} >
      <Input name='description' required onChange={taskInput} className='home-form-input' placeholder="Task Description" prefix={<UserOutlined />} />
      <Input.Group compact>
      <select name='assigned_to' required defaultValue='def' onChange={taskInput}>
        <option value='def'>Assign To</option>
        {props.members.map((member:any) => {
          return (<option key={member.id} value={member.id}>{`${member.first_name} ${member.last_name}`}</option>)
        })}
        
      </select>
      <select name='private' defaultValue='0' onChange={taskInput}>
        <option value='0'>Private</option>
        <option value='1'>Public</option>
      </select>
    </Input.Group>
 
      <Button htmlType='submit' className='home-form-button' type="primary" shape="round" size='large'>
          Assign Task
        </Button>
      </form>
    </div>
  )
}

export default NewTaskInput