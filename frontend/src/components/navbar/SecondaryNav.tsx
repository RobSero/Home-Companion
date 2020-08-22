import React from 'react'
import axios from 'axios'
import {getUserLocations} from '../../lib/api'

const SecondaryNavbar = () => {
const [isOpen, toggleOpen] = React.useState(false)
const [userLocationList, setList] = React.useState([])
const [mainProperty, setMainProperty] = React.useState({property_name: null, members:[]})

React.useEffect(()=> {
  const getUserData = async() => {
    try {
      const res = await getUserLocations()
      console.log(`success! User has ${res.data.length} locations`);
      
      setList(res.data)
      setMainProperty(res.data[0])
    }
    catch(err) {
      console.log(err.response);
    }
  }
getUserData()
}, [])

const toggleNav = () => {
  toggleOpen(!isOpen)
}

const changeLocation = (num:number) => {
  const selectedLocation = userLocationList.filter((location:any) => {
      return location['id'] === num
  })
  setMainProperty(selectedLocation[0])
}

  return (
    <nav className="navbar is-transparent is-dark">
    <div className="navbar-brand">
      {userLocationList.length === 0 ? 
       <div className="navbar-item">
       <p>ADD PROPERTY HERE</p>
     </div> :
     <div className="navbar-item has-dropdown is-hoverable">
     <p>{mainProperty['property_name']}</p>
     <div className="navbar-dropdown is-boxed">
        {userLocationList.length === 1 ? '' :
        userLocationList.map((location:any) => {
          return (
            <p key={location['id']} className="navbar-item" onClick={()=>{changeLocation(location['id'])}}>
            {location['property_name']}
          </p>
          )
        })  
      }


          <p className="navbar-item">
            Add Property
          </p>
          </div>
   </div>
      }
     
      <div onClick={toggleNav} className={isOpen? "navbar-burger burger is-active" : "navbar-burger burger" } data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  
    <div id="navbarExampleTransparentExample" className={isOpen? "navbar-menu is-active" : "navbar-menu" }>
      <div className="navbar-start">
        <a className="navbar-item" href="https://bulma.io/">
          Tasks
        </a>
      </div>
  
      <div className="navbar-end">
      {userLocationList.length === 0 ? 
       '' :
     <div className="navbar-item">
     {mainProperty.members.map((member:object) => {
       return <img src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1591819721/empty-avatar-png-transparent_mighcw.png'/>
     })}
   </div>
      }
      </div>
    </div>
  </nav>
  )
}

export default SecondaryNavbar