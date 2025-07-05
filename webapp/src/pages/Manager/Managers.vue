<script setup>
import { ref, onMounted } from 'vue'
import { useManagerService } from '../../services/managerService'
import DynamicTable from '../../components/DynamicTable.vue'
import DeleteModal from '../../components/DeleteModal.vue'
import { SlPencil } from 'vue-icons-plus/sl'
import { SlTrash } from 'vue-icons-plus/sl'

const { fetchManagers } = useManagerService()
const managers = ref([])
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  goToFirstPage: () => {},
  goToPreviousPage: () => {},
  goToNextPage: () => {},
  goToLastPage: () => {}
})
const isModalOpen = ref(false)
const selectedManager = ref(null)

const openDeleteModal = (manager) => {
  selectedManager.value = manager
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedManager.value = null
}

const goToFirstPage = () => {
  console.log('Going to first page')
}

const goToPreviousPage = () => {
  console.log('Going to first page')
}

const goToNextPage = () => {
  console.log('Going to first page')
}

const goToLastPage = () => {
  console.log('Going to first page')
}

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
]

const actions = [
  {
    label: 'Edit',
    icon: SlPencil,
    color: '#1976d2',
    onClick: (item) => console.log('Edit', item)
  },
  {
    label: 'Delete',
    icon: SlTrash,
    color: '#d32f2f',
    onClick: (item) => openDeleteModal(item)
  }
]

onMounted(async () => {
  const response = await fetchManagers()
  if (response?.data) {
    managers.value = response.data.data
    pagination.value.totalPages = response.data.totalPages
    pagination.value.currentPage = response.data.page 
  } else {
    console.error('Failed to fetch managers:', response)
  }
})
</script>

<template>
  <div>
    <h1>Managers Page</h1>

    <DynamicTable
      :items="managers"
      :columns="columns"
      :actions="actions"
      :pagination="pagination"
    />
    <div v-if="managers.length === 0">
      No managers found.
    </div>

    <DeleteModal
      :isModalOpen="isModalOpen"
      :selectedManager="selectedManager"
      :closeModal="closeModal"
    />
  </div>
</template>

<style scoped>
h1 {
  color: #0f163b;
  font-size: 2rem
}
</style>