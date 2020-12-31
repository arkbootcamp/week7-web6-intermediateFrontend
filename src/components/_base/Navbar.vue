<template>
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/product">Product</router-link> |
    <router-link to="/lifecycle">Lifecycle</router-link>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Navbar',
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      console.log('Anda berhasil logout')
      this.logout()
    }
  }
}
</script>
