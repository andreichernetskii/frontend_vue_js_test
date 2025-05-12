import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://finman-project.duckdns.org', // production backend address
  baseURL: 'http://localhost:8080', // local backend address
  withCredentials: true, // allows browser to keep cookies
})

api.interceptors.response.use(
  (response) => response, // do nothing if OK
  async (error) => {
    console.error('Axios Interceptor Error:', error)

    if (error.response && error.response.status === 401) {
      console.log('Interceptor: Unauthorized (401)')
      try {
        const { useAuthStore } = await import('@/stores/auth')
        const authStore = useAuthStore()
        authStore.requireLogin()
      } catch (importError) {
        console.error('Failed to import auth store in interceptor:', importError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
