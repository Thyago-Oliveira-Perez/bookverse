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
