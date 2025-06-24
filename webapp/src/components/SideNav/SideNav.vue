<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: "mdi:view-dashboard" },
  { path: "/managers", label: "Managers", icon: "mdi:account-tie-outline" },
  { path: "/users", label: "Users", icon: "mdi:account-multiple-outline" },
  { path: "/books", label: "Books", icon: "mdi:book-open-page-variant-outline" },
  { path: "/authors", label: "Authors", icon: "mdi:pen" },
  { path: "/publishers", label: "Publishers", icon: "mdi:domain" },
  { path: "/category", label: "Category", icon: "mdi:tag-outline" }
];

const isCollapsed = ref(false)
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
const activeUser = ref({
  name: "Admin",
  photo: "../../user.svg"
});
// TODO: Replace with actual user data from aws s3 (or something similar)
// const imageUrl = new URL(`./dir/${activeUser.photo}.png`, import.meta.url).href
</script>

<template>
  <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="admin-header">
      <div class="admin-header-user">
        <img class="admin-header-photo" src="../../assets/user.svg" alt="User's photo" />
        <h1 class="admin-header-text">{{ activeUser.name }}</h1>
      </div>
      <button class="toggle-btn" @click.stop="toggleSidebar">
        <Icon :icon="isCollapsed ? 'mdi:menu' : 'mdi:menu-open'" />
      </button>
    </div>
    <RouterLink
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-link"
      active-class="active"
    >
      <Icon :icon="item.icon" class="icon" />
      <span class="nav-text">{{ item.label }}</span>
    </RouterLink>
  </aside>
</template>

<style scoped>
.sidebar {
  top: 0;
  left: 0;
  height: 100vh;
  width: 240px;
  background-color: #52438f;
  color: #f7f7f7;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  z-index: 1000;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 64px;
  align-items: center;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
}

.sidebar.collapsed .admin-header {
  justify-content: center;
}

.admin-header-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.sidebar.collapsed .admin-header-user {
  opacity: 0;
  width: 0;
}

.admin-header-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #64748b;
  padding: 2px;
  background: #fff;
  flex-shrink: 0;
  transition: opacity 0.3s ease;
}

.admin-header-text {
  transition: opacity 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar.collapsed .admin-header-text {
  opacity: 0;
  width: 0;
  position: absolute;
}

.toggle-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.sidebar.collapsed .toggle-btn {
  margin-left: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
}

.nav-text {
  transition: opacity 0.3s ease;
}

.sidebar.collapsed .nav-text {
  opacity: 0;
  width: 0;
}

.sidebar:not(.collapsed) .nav-link {
  padding: 0.5rem 1rem;
}

.nav-link:hover,
.active {
  background-color: #7d6cc8;
}

.icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.nav-text {
  transition: opacity 0.3s ease;
}

.sidebar.collapsed .nav-text {
  opacity: 0;
  width: 0;
}
</style>