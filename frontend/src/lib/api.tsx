import axios from 'axios'

const baseUrl = '/api'

export const registerUser = async(formData:object) => {
  return axios.post(`${baseUrl}/auth/register/`, formData) 
}

export const loginUser = async(formData:object) => {
  return axios.post(`${baseUrl}/auth/login/`, formData) 
}