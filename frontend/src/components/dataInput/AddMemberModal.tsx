import React from 'react'
import { Modal, Button, Input } from 'antd';
import { UserOutlined, DownCircleOutlined } from '@ant-design/icons';
import {createProperty, addNewMember} from '../../lib/api'

function AddMemberModal(props:any) {
  const [modalOpen, toggleModal] = React.useState(false)
  const [ memberEmail, userInput] = React.useState('')

const handleInput = ({target}:any) => {
  console.log(target)
  userInput(target.value)
}

  const showModal = () => {
    toggleModal(true)
  };

  const handleOk = async() => {
    console.log('adding member');
    try {
      const res = await addNewMember(memberEmail, props.mainProperty.id)
      console.log(res.data)
      props.addedMember(props.mainProperty.id)
    } catch(err){
      console.log(err.response)
    }
    toggleModal(false)
  };

  const handleCancel = (e:any) => {
    console.log(e);
    toggleModal(false)
  };

    return (
      <>
        <DownCircleOutlined style={{fontSize: '15px'}} onClick={showModal} />
        <Modal
          title="Basic Modal"
          visible={modalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <h2>Add new member to {props.mainProperty.property_name} </h2>
          <Input name='newMemberEmail' onChange={handleInput} className='home-form-input' placeholder="Email of Member" prefix={<UserOutlined />} />
          <p>Member's Email</p>
        </Modal>
      </>
    )
  
}

export default AddMemberModal