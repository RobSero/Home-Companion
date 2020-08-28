import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import NewPropertyModal from '../dataInput/NewPropertyModal'
import {getUserLocations} from '../../lib/api'
import {CaretDownOutlined } from '@ant-design/icons';
import AddMemberModal from '../dataInput/AddMemberModal'

const SecondaryNavbar = () => {
const [isOpen, toggleOpen] = React.useState(false)
const [userLocationList, setList] = React.useState([])
const [mainProperty, setMainProperty] = React.useState({property_name: null, members:[], id: null})
const [reload,setReload] = React.useState(false)

// --------------- COLLECT THE USER'S LOCATION DATA ----------------
const getUserData = async() => {
  try {
    const res = await getUserLocations()
    console.log(`success! User has ${res.data.length} locations`);
    setMainProperty(res.data[0])
    setList(res.data)
    
  }
  catch(err) {
    console.log(err.response);
  }
}

const addedMember = async(propertyId:number) => {
  try {
    console.log('RELOAD REQUIRED');
    await getUserLocations()
    setMainProperty({property_name: null, members:[], id: null})
    changeLocation(propertyId)
  }
  catch(err) {
    console.log(err.response);
  }
}

// --------------- ON COMPONENT MOUNT ----------------
React.useEffect(()=> {
getUserData()
}, [])

const toggleNav = () => {
  toggleOpen(!isOpen)
}

// --------------- SET USERS CURRENT LOCATION ----------------
const changeLocation = (num:number) => {
  const selectedLocation = userLocationList.filter((location:any) => {
      return location['id'] === num
  })
  console.log('SETTING LOCATION');
  
  setMainProperty(selectedLocation[0])
}

  return (
    <nav className="navbar is-transparent is-dark">
      {/* USERS LIST OF LOCATIONS */}
    <div className="navbar-brand">
      {userLocationList.length === 0 ? 
       <div className="navbar-item">
       <NewPropertyModal addPropertyToList={getUserData} />
     </div> :
     <div className="navbar-item has-dropdown is-hoverable">
       {/* MAP OUT LIST OF USER'S PROPERTIES */}
     <p className='navbar-secondary-text'>{mainProperty['property_name']}</p><CaretDownOutlined />
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
      {/* ADD PROPERTY MODAL BUTTON */}
          <p className="navbar-item">
          <NewPropertyModal addPropertyToList={getUserData} />
          </p>
          
          </div>
   </div>
      }
     {/* BURGER MENU FOR MOBILE */}
      <div onClick={toggleNav} className={isOpen? "navbar-burger burger is-active" : "navbar-burger burger" } data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  
  {/* PROPERTY OPTIONS ON NAVBAR */}
    <div id="navbarExampleTransparentExample" className={isOpen? "navbar-menu is-active" : "navbar-menu" }>
      <div className="navbar-start">
        <Link className='navbar-secondary-text' to={`/tasks/${mainProperty.id}`}>
          Tasks
        </Link>
        <Link className='navbar-secondary-text' to={`/groceries/${mainProperty.id}`}>
          Groceries
          </Link>
        <Link className='navbar-secondary-text' to={`/calendar/${mainProperty.id}`}>
          Calendar
          </Link>
        <Link className='navbar-secondary-text' to={`/details/${mainProperty.id}`}>
          Property Details
          </Link>
      </div>
  
      <div className="navbar-end">
      {userLocationList.length === 0 ? 
       '' :
     <div className="navbar-item">
     {mainProperty.members.map((member:object) => {
       return <img key={Math.random()} src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1591819721/empty-avatar-png-transparent_mighcw.png'/>
     })}
     
     <AddMemberModal mainProperty={mainProperty} addedMember={addedMember} />
   </div>
      }
      </div>
    </div>
  </nav>
  )
}

export default SecondaryNavbar