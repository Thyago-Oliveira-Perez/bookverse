import { useApi } from '../composables/useApi'

export function useManagerService() {
  const { getAsync, loading, error } = useApi()
  const baseUrl = '/api/manager'

  const createManager = async () => {
    return await getAsync(`${baseUrl}/create`)
  }

  const updateManager = async () => {
    return await getAsync(`${baseUrl}/list`)
  }

  const fetchManagers = async () => {
    return await getAsync(`${baseUrl}/list`)
  }

  const deleteManager = async (id) => {
    return await getAsync(`${baseUrl}/delete/${id}`)
  }

  return { createManager, fetchManagers, loading, error }
}
