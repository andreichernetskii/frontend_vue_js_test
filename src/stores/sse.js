import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useTransactionStore } from './transactions'
import { useLimitStore } from './limits'
import { useAlertStore } from './alerts'
import { useAuthStore } from './auth'

// for prod
// 'https://finman-project.duckdns.org/api/stream/subscribe'

const SSE_URL = 'http://localhost:8080/api/stream/subscribe'

export const useSseStore = defineStore('sse', () => {
  const connectionStatus = ref({ type: 'info', message: 'Disconnected' })
  let eventSource = null
  let reconnectTimeoutId = null

  function processResponse(data) {
    const transactionStore = useTransactionStore()
    const limitStore = useLimitStore()
    const alertStore = useAlertStore()

    console.log('SSE Received: ', data)

    try {
      const parsedData = JSON.parse(data)
      switch (parsedData.eventType) {
        case 'TRANSACTIONS_ALL':
          transactionStore.setTransactions(parsedData.data)
          break

        case 'LIMITS_ALL':
          limitStore.setLimits(parsedData.data)
          break

        case 'ALERTS_ALL':
          alertStore.setAlerts(parsedData.data)
          break

        default:
          console.error(`${data.eventType}: Unknown type of event!`)
      }
    } catch (error) {
      console.error('SSE: Error parsing message data:', error, 'Raw data:', data)
    }
  }

  function connect() {
    if (
      eventSource &&
      (eventSource.readyState === EventSource.OPEN ||
        eventSource.readyState === EventSource.CONNECTING)
    ) {
      console.log('SSE: Already connected or connecting.')
      return
    }

    if (reconnectTimeoutId) {
      clearTimeout(reconnectTimeoutId)
      reconnectTimeoutId = null
    }

    console.log('SSE: Attempting to connect...')
    connectionStatus.value = { type: 'info', message: 'Connecting...' }

    eventSource = new EventSource(SSE_URL, { withCredentials: true })

    eventSource.onopen = () => {
      connectionStatus.value = { type: 'success', message: 'Connection established' }
      console.log('SSE: Connection opened.')
    }

    eventSource.addEventListener('connected', (event) => {
      connectionStatus.value = { type: 'success', message: event.data }
      console.log('SSE: Server sent connected event: ', event.data)
    })

    eventSource.onmessage = (event) => {
      processResponse(event.data)
    }

    eventSource.onerror = (error) => {
      console.error('SSE: Connection error: ', error)
      connectionStatus.value = { type: 'error', message: 'Connection error. Retrying...' }

      if (eventSource) {
        eventSource.close()
        eventSource = null
      }

      scheduleReconnect()
    }
  }

  function scheduleReconnect() {
    if (reconnectTimeoutId) {
      clearTimeout(reconnectTimeoutId)
    }

    // do not connect while login panel is active

    const authStore = useAuthStore()

    if (authStore.showLoginPanel) {
      console.log('SSE: Reconnect prevented, login panel is visible.')
      connectionStatus.value = { type: 'warning', message: 'Disconnected. Waiting for login.' }
      return
    }

    console.log('SSE: Scheduling reconnect in 5 seconds...')
    connectionStatus.value = { type: 'warning', message: 'Disconnected. Reconnecting in 5s...' }
    reconnectTimeoutId = setTimeout(() => {
      reconnectTimeoutId = null
      connect()
    }, 5000)
  }

  function disconnect() {
    if (reconnectTimeoutId) {
      clearTimeout(reconnectTimeoutId)
      reconnectTimeoutId = null
    }

    if (eventSource) {
      eventSource.close()
      eventSource = null
      connectionStatus.value = { type: 'info', message: 'Disconnected' }
      console.log('SSE: Connection closed manually.')
    }
  }

  return { connectionStatus, connect, disconnect }
})
