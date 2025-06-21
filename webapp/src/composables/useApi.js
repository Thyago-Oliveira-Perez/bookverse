import api from '../lib/api'
import { ref } from 'vue'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const getAsync = async (url) => {
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

  const postAsync = async (url, data) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post(url, data)
      return response.data
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteAsync = async (url) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.delete(url)
      return response.data
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  return { getAsync, postAsync, deleteAsync, loading, error }
}
