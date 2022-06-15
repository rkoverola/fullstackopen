import axios from 'axios'

const baseUrl = '/api/persons'

const add = (personObject) => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

const update = (id, personObject) => {
  const url = baseUrl + '/' + id
  const request = axios.put(url, personObject)
  return request.then(request => request.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const remove = (person) => {
  const url = baseUrl + '/' + person.id
  const request = axios.delete(url)
  return request.then(response => response)
}

const personService = {add, getAll, remove, update}
export default personService