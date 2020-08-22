import React from 'react'
import {useHistory} from 'react-router-dom'
import {loginUser} from '../../lib/api'
import {setToken} from '../../lib/auth'
import { Input, Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const Login = (props:any) => {
  const [loginData, updateLogin] = React.useState({
  })
  const history = useHistory()

  const userInput = ({target: {name,value}}:any) => {
    updateLogin({
      ...loginData,
      [name]: value
    })
  }

  const submitLogin = async(e:any) => {
    e.preventDefault()
    console.log('submitting');
    
    try {
      const res = await loginUser(loginData)
      console.log('SUCCESS')
      setToken(res.data.token)
      history.push('/dashboard')
    }
    catch(err){
      console.log(err.response.data);
    }  
  }





  return (
    <div className='home-form login'>
      <h1 className='home-form-header'>Welcome Back</h1>
      <Button className='home-form-button' type="primary" shape="round" size='large'>
          Sign in with Facebook
        </Button>
        <form onSubmit={submitLogin}>
      <Input name='email' onChange={userInput} className='home-form-input' placeholder="Email" prefix={<UserOutlined />} />
      <br />
      <Input.Password name='password' onChange={userInput} className='home-form-input' placeholder="Password" prefix={<UserOutlined />} />
      <br />
      <Button htmlType='submit' className='home-form-button' type="primary" shape="round" size='large'>
          Login
        </Button>
        </form>
        <p onClick={()=>{props.registerShow()}} className='home-form-text'>Not got an Account? Sign up here</p>
      
        
    </div>
  )
}

export default Login