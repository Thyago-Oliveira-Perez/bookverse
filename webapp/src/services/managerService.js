import { useApi } from '../composables/useApi'

export function useManagerService() {
  const { get, loading, error } = useApi()
  const baseUrl = '/api/manager'

  const createManager = async () => {
    return await get(`${baseUrl}/create`)
  }

  const fetchManagers = async () => {
    return await get(`${baseUrl}/list`)
  }

  return { createManager, fetchManagers, loading, error }
}
