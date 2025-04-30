import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://finman-project.duckdns.org', // production backend address
  baseURL: 'http://localhost:8080', // local backend address
  withCredentials: true, // allows brouser to keep cookies
})

api.interceptors.response.use(
  (rsponse) => response, // do nothing if OK
  async (error) => {
    console.error('Axios Interceptor Error:', error)

    if (error.response && error.response.status === 401) {
      console.log('Interceptor: Unauthorized (401)')
      try {
        const { useAuthStrore } = await import('./stores/auth')
        const authStore = useAuthStrore()
        authStore.requireLogin()
      } catch (importError) {
        console.error('Failed to import auth store in interceptor:', importError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
