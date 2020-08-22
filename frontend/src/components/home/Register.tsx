import React from 'react'
import { Input, Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {registerUser} from '../../lib/api'


const Register = (props:any) => {
  const [registerData, updateRegister] = React.useState({
  })

  const userInput = ({target: {name,value}}:any) => {
    updateRegister({
      ...registerData,
      [name]: value
    })
  }

  const submitRegistration = async(e:any) => {
    e.preventDefault()
    console.log('submitting');
    
    try {
      const res = await registerUser(registerData)
      console.log('SUCCESS')
      console.log(res.data);
      props.loginShow()

    }
    catch(err){
      console.log(err.response.data);
    }
    
  }

  return (
    <div className='home-form register'>
    <h1 className='home-form-header'>Get Organised within minutes</h1>
    <Button className='home-form-button' type="primary" shape="round" size='large'>
        Sign Up with Facebook
      </Button>
      <form onSubmit={submitRegistration}>
    <Input name='first_name' onChange={userInput} className='home-form-input' placeholder="First Name" prefix={<UserOutlined />} />
    <br />
    <Input name='last_name' onChange={userInput} className='home-form-input' placeholder="Last Name" prefix={<UserOutlined />} />
    <br />
    <Input name='username' onChange={userInput} className='home-form-input' placeholder="Username" prefix={<UserOutlined />} />
    <br />
    <Input name='email' onChange={userInput} className='home-form-input' placeholder="Email" prefix={<UserOutlined />} />
    <br />
    <Input.Password name='password' onChange={userInput} className='home-form-input' placeholder="Password" prefix={<UserOutlined />} />
    <br />
    <Input.Password name='password_confirmation' onChange={userInput}  className='home-form-input' placeholder="Password Confirmation" prefix={<UserOutlined />} />
    <br />
    <Button htmlType="submit" className='home-form-button' type="primary" shape="round" size='large'>
        Register
      </Button>
      </form>
      <p onClick={()=>{props.loginShow()}}  className='home-form-text'>Already Registered? Sign ip here</p>
    
      
  </div>
  )
}

export default Register