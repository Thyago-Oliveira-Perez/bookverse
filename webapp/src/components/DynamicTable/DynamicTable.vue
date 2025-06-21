<script setup>
defineProps({
  items: Array,
  columns: Array,
  actions: Array
})
</script>

<template>
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
            class="action-button"
            :style="{ backgroundColor: action.color }"
            @click="() => action.onClick(item)"
          >
            {{ action.label }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-family: Arial, sans-serif;
  background-color: #333;
  color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.custom-table thead {
  background-color: #f5f5f5;
}

.custom-table th,
.custom-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.custom-table th {
  font-weight: 600;
  color: #222;
}

.table-row:hover {
  background-color: #4c4c4c;
}

.action-button {
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  margin-right: 8px;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-button:hover {
  filter: brightness(90%);
}
</style>