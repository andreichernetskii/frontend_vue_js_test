import axios from 'axios'

const api = axios.create({
  baseURL: 'https://finman-project.duckdns.org', // backend address
  withCredentials: true, // allows brouser to keep cookies
})

export default api
