import React from 'react'
import { Input, Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const Register = (props:any) => {
  const [registerData, updateRegister] = React.useState({
  })

  const userInput = ({target: {name,value}}:any) => {
    updateRegister({
      ...registerData,
      [name]: value
    })
  }

  const submitRegistration = () => {
    
  }

  return (
    <div className='home-form register'>
    <h1 className='home-form-header'>Get Organised within minutes</h1>
    <Button className='home-form-button' type="primary" shape="round" size='large'>
        Sign Up with Facebook
      </Button>
    <Input name='first_name' onChange={userInput} className='home-form-input' placeholder="First Name" prefix={<UserOutlined />} />
    <br />
    <Input name='last_name' onChange={userInput} className='home-form-input' placeholder="Last Name" prefix={<UserOutlined />} />
    <br />
    <Input name='email' onChange={userInput} className='home-form-input' placeholder="Email" prefix={<UserOutlined />} />
    <br />
    <Input.Password name='password' onChange={userInput} className='home-form-input' placeholder="Password" prefix={<UserOutlined />} />
    <br />
    <Input.Password name='password_confirmation' onChange={userInput}  className='home-form-input' placeholder="Password Confirmation" prefix={<UserOutlined />} />
    <br />
    <Button className='home-form-button' type="primary" shape="round" size='large'>
        Login
      </Button>
      <p onClick={()=>{props.loginShow()}}  className='home-form-text'>Already Registered? Sign ip here</p>
    
      
  </div>
  )
}

export default Register