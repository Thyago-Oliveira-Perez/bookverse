import api from '../lib/api'
import { ref } from 'vue'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const get = async (url) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(url)
      return response.data
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  return { get, loading, error }
}
