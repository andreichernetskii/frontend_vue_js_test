import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080', // backend address
  withCredentials: true, // allows brouser to keep cookies
})

export default api
