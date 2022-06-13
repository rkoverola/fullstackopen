import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const add = (personObject) => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {add, getAll}