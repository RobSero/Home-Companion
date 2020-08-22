import React from 'react'
import { Input, Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const Login = (props:any) => {

  return (
    <div className='home-form login'>
      <h1 className='home-form-header'>Welcome Back</h1>
      <Button className='home-form-button' type="primary" shape="round" size='large'>
          Sign in with Facebook
        </Button>
      <Input className='home-form-input' placeholder="Email" prefix={<UserOutlined />} />
      <br />
      <Input.Password className='home-form-input' placeholder="Password" prefix={<UserOutlined />} />
      <br />
      <Button className='home-form-button' type="primary" shape="round" size='large'>
          Login
        </Button>
        <p onClick={()=>{props.registerShow()}} className='home-form-text'>Not got an Account? Sign up here</p>
      
        
    </div>
  )
}

export default Login