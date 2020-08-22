import React from 'react'
import Login from './Login'
import Register from './Register'
import { Button  } from 'antd';

const styles = {
  formShow: {
    opacity: 1
  },
  formHide: {
    opacity: 0,
    height: 0
  }
}


function HomePage() {
  const [loginOpen, toggleLogin] = React.useState(false)
  const [registerOpen, toggleRegister] = React.useState(false)
  const [welcomeOpen, toggleWelcome] = React.useState(true)

  const loginShow = () => {
    toggleRegister(false)
    toggleWelcome(false)
    toggleLogin(true)

  }

  const registerShow = () => {
    toggleLogin(false)
    toggleWelcome(false)
    toggleRegister(true)
    console.log('heyya');

  }

  return (
    <div className='container'>
      <div className='home-flex'>
        <div className='home-flex-item'>
          <img className='home-img' src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1598094090/homeCompanionApp/pngwave_30_v9u3t8.png'></img>
        </div>
        <div className='home-flex-item'>
          {/* WELCOME SECTION */}
          <div className='fade-animation' style={welcomeOpen ? styles.formShow : styles.formHide}>
            <div className='home-form'>
              <h1 className='home-form-header'>Managing your home just got a whole lot easier…</h1>
              <ul>
                <li>Keep track of your Daily Errands</li>
                <li>Share house tasks and bills with your housemates</li>
                <li>Control your smart TV </li>
                <li>Book in dates of deliveries</li>
                <li>All in one convenient place!</li>
              </ul>
              <Button onClick={loginShow} className='home-form-button' type="primary" shape="round" size='large'>
        Login
      </Button>
      <Button onClick={registerShow} className='home-form-button' type="primary" shape="round" size='large'>
        Register
      </Button>
            </div>

          </div>
          {/* LOGIN SECTION */}
          <div className='fade-animation' style={loginOpen ? styles.formShow : styles.formHide}>
            <Login registerShow={registerShow} />
          </div>
          {/* REGISTER SECTION */}
          <div className='fade-animation' style={registerOpen ? styles.formShow : styles.formHide}>
            <Register loginShow={loginShow} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage