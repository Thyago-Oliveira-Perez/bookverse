<script setup>
import { ref, onMounted } from 'vue'
import { useManagerService } from '../../services/managerService'
import DynamicTable from '../../components/DynamicTable/DynamicTable.vue'

const managers = ref([])
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
]

const actions = [
  {
    label: 'Edit',
    color: 'blue',
    onClick: (user) => {
      console.log('Edit:', user)
    }
  },
  {
    label: 'Delete',
    color: 'red',
    onClick: (user) => {
      console.log('Delete:', user)
    }
  }
]

const { fetchManagers } = useManagerService()

onMounted(async () => {
  const response = await fetchManagers()
  if (response?.data) managers.value = response.data
  else console.error('Failed to fetch managers:', response)
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl mb-4">Managers Page</h1>

    <DynamicTable
      :items="managers"
      :columns="columns"
      :actions="actions"
    />
  </div>
</template>
