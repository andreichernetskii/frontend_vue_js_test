import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://finman-project.duckdns.org', // production backend address
  baseURL: 'http://localhost:8080', // local backend address
  withCredentials: true, // allows brouser to keep cookies
})

export default api
