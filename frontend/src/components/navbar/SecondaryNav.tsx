import React from 'react'


const SecondaryNavbar = () => {
const [isOpen, toggleOpen] = React.useState(false)

const toggleNav = () => {
  toggleOpen(!isOpen)
}


  return (
    <nav className="navbar is-transparent is-dark">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <p>ADD PROPERTY HERE</p>
      </a>
      <div onClick={toggleNav} className={isOpen? "navbar-burger burger is-active" : "navbar-burger burger" } data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  
    <div id="navbarExampleTransparentExample" className={isOpen? "navbar-menu is-active" : "navbar-menu" }>
      <div className="navbar-start">
        <a className="navbar-item" href="https://bulma.io/">
          Home
        </a>
      </div>
  
      <div className="navbar-end">
        <div className="navbar-item">
         MEMBERS SECTION
        </div>
      </div>
    </div>
  </nav>
  )
}

export default SecondaryNavbar