<script setup>
import { ref, onMounted } from 'vue'
import { useManagerService } from '../../services/managerService'
import DynamicTable from '../../components/DynamicTable.vue'
import DeleteModal from '../../components/DeleteModal.vue'

const { fetchManagers } = useManagerService()
const managers = ref([])
const isModalOpen = ref(false)
const selectedManager = ref(null)

const openEditModal = (manager) => {
  selectedManager.value = manager
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedManager.value = null
}

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
]

const actions = [
  {
    label: 'Edit',
    color: 'blue',
    onClick: openEditModal
  },
  {
    label: 'Delete',
    color: 'red',
    onClick: (user) => {
      console.log('Delete:', user)
    }
  }
]

onMounted(async () => {
  const response = await fetchManagers()
  if (response?.data) managers.value = response.data
  else console.error('Failed to fetch managers:', response)
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl mb-4">Managers Page</h1>

    <div v-if="managers.length > 0" class="mt-4">
      <p class="text-gray-600">Total Managers: {{ managers.length }}</p>
    </div>

    <DynamicTable
      :items="managers"
      :columns="columns"
      :actions="actions"
    />
    <div v-if="managers.length === 0" class="text-center text-gray-500 mt-4">
      No managers found.
    </div>

    <DeleteModal
      :isModalOpen="isModalOpen"
      :selectedManager="selectedManager"
      :closeModal="closeModal"
    />
  </div>
</template>
