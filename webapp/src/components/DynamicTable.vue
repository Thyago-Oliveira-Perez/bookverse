<script setup>
import { EpDArrowLeft, EpArrowLeft, EpArrowRight, EpDArrowRight } from 'vue-icons-plus/ep'
import { computed, defineProps } from 'vue'

const props = defineProps({
  items: Array,
  columns: Array,
  actions: Array,
  pagination: Object,
})
</script>

<template>
  <div class="pagination-container">
    <div>
      <p>Total: {{ items.length }}</p>
    </div>
    <div class="pagination-controls">
      <button @click="pagination.goToFirstPage" :disabled="pagination.currentPage === 1">
        <component :is="EpDArrowLeft" class="icon" />
      </button>
      <button @click="pagination.goToPreviousPage" :disabled="pagination.currentPage === 1">
        <component :is="EpArrowLeft" class="icon" />
      </button>
      <p>Page {{ pagination.currentPage }} of {{ pagination.totalPages }}</p>
      <button @click="pagination.goToNextPage" :disabled="pagination.currentPage === pagination.totalPages">
        <component :is="EpArrowRight" class="icon" />
      </button>
      <button @click="pagination.goToLastPage" :disabled="pagination.currentPage === pagination.totalPages">
        <component :is="EpDArrowRight" class="icon" />
      </button>
    </div>
  </div>

  <table class="custom-table">
    <thead>
      <tr class="table-header">
        <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        <th v-if="actions?.length">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id" class="table-row">
        <td v-for="col in columns" :key="col.key">{{ item[col.key] }}</td>
        <td v-if="actions?.length">
          <button
            v-for="action in actions"
            :key="action.label"
            class="action-icon"
            :style="{ backgroundColor: action.color }"
            @click="() => action.onClick(item)"
            :title="action.label"
          >
            <component :is="action.icon" class="icon" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.pagination-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.pagination-container p {
  color: #666974;
  font-size: 1rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pagination-controls button {
  padding: 0.4rem;
  border: none;
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-family: Arial, sans-serif;
  color: #ffffff;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.custom-table thead {
  background-color: #ffffff;
}

.custom-table th,
.custom-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #dddd;
}

.custom-table th {
  font-weight: 600;
  color: #a3a6ab;
}

.table-row {
  color: #666974;
  background-color: #ffffff;
}

.action-icon {
  border: none;
  border-radius: 6px;
  padding: 6px;
  margin-right: 6px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 18px;
  height: 18px;
}

.action-icon:hover {
  filter: brightness(90%);
}
</style>
