import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

export const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

// ---------------------------

export const registerUser = async(formData:object) => {
  return await axios.post(`${baseUrl}/auth/register/`, formData) 
}

export const loginUser = async(formData:object) => {
  return await axios.post(`${baseUrl}/auth/login/`, formData) 
}

export const getUserLocations = async() => {
  return await axios.get(`${baseUrl}/location/user/`, withHeaders()) 
}