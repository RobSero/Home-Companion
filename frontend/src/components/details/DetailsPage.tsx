import React from 'react'
import {useParams} from 'react-router-dom'
import SecondaryNavbar from '../navbar/SecondaryNav'
import {getLocationDetails} from '../../lib/api'

interface RouteParams {
  id:string
}

const DetailsPage = () => {
const {id} = useParams<RouteParams>()
console.log(id);
const [propertyDetails, setDetails] = React.useState({})
const LocationDetails = async() => {
  try {
      const res = await getLocationDetails(id)
      setDetails(res.data)
      console.log(res.data)
  } catch(err){
    console.log(err.response);
  }
}

React.useEffect(()=>{
  LocationDetails()
},[])

if(propertyDetails === null){
  return null
}

  return (
    <div className='r-container'>
    <SecondaryNavbar />
    <h1>DETAILS FOR {id}</h1>
    <div className='details-flex-container'>
    <div className='details-flex-item'>
      <p className='details-label'>Property Name:</p>
  {/* {propertyDetails.property_name && <p className='details-value'>{propertyDetails.property_name}</p>} */}
    </div>
    <div className='details-flex-item'>
      <p>2</p>
    </div>
    </div>
  
  </div>
  )
}

export default DetailsPage