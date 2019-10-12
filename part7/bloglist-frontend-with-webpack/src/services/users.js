import axios from 'axios'
const baseUrl = BACKEND_URL + 'api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

export default { getAll }