<script setup>
defineProps({
  isModalOpen: Boolean,
  selectedManager: Object,
  closeModal: Function
})
</script>

<template>
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal">
        <h2 class="tittle">
          Are you sure you want to delete?
        </h2>
        <div class="buttons">
          <button @click="closeModal" class="cancel">
            Cancel
          </button>
          <button class="save">
            Save
          </button>
        </div>
      </div>
    </div>
</template>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: #333;
  height: 250px;
  width: 400px;
  margin-top: 10%;
  border-radius: 20px;
}

.tittle {
  color: white;
  margin-top: 50px;
  font-weight: 500;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
}

.cancel {
  background-color: #f44336;
}

.save {
  background-color: #4CAF50;
}

h2 {
  font-weight: 500;
  font-size: 28px;
}

button {
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
  cursor: pointer;
}
</style>
