import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  console.log('Posting to', baseUrl, credentials)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const loginService = { login } 
export default loginService