import React from 'react'
import { Modal, Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {createProperty} from '../../lib/api'

function NewPropertyModal(props:any) {
  const [modalOpen, toggleModal] = React.useState(false)
  const [ newPropertyData, userInput] = React.useState({})

const handleInput = ({target}:any) => {
  console.log(target)
  userInput({
    ...newPropertyData,
    [target.name] : target.value
  })
}

  const showModal = () => {
    toggleModal(true)
  };

  const handleOk = async() => {
    console.log('creating new property');
    try {
      const res = await createProperty(newPropertyData)
      console.log(res.data)
      props.addPropertyToList()
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
        <Button type="primary" onClick={showModal}>
          Add Property
        </Button>
        <Modal
          title="Basic Modal"
          visible={modalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >

          <Input name='property_name' onChange={handleInput} className='home-form-input' placeholder="Property Name" prefix={<UserOutlined />} />
          <p>Property Name</p>
      <Input name='postcode' onChange={handleInput} className='home-form-input' placeholder="Postcode" prefix={<UserOutlined />} />
      <p>Property Postcode</p>
      <Input name='address' onChange={handleInput} className='home-form-input' placeholder="Property Address" prefix={<UserOutlined />} />
      <p>Property Address</p>
      <Input name='landlord_name' onChange={handleInput} className='home-form-input' placeholder="Landlord Name" prefix={<UserOutlined />} />
      <p>Landlord Name(not required)</p>
      <Input name='landlord_number' onChange={handleInput} className='home-form-input' placeholder="Landlord Number" prefix={<UserOutlined />} />
      <p>Landlord Number(not required)</p>
      <Input name='landlord_email' onChange={handleInput} className='home-form-input' placeholder="Landlord Email" prefix={<UserOutlined />} />
      <p>Landlord Email(not required)</p>

        </Modal>
      </>
    )
  
}

export default NewPropertyModal