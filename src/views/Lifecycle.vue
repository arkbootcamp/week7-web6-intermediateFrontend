<template>
  <div class="lifecycle">
    <div class="centered">
      <img alt="Vue logo" src="../assets/logo.png" />
      <Navbar />
      <h1>This is Page Lifecycle</h1>
    </div>
  </div>
</template>

<script>
// [1] step pertama import komponen
import Navbar from '../components/_base/Navbar'

export default {
  name: 'Lifecycle',
  // [2] step 2 mendaftarkan komponen yang sudah kita import
  components: {
    Navbar
  }
}
</script>

<style scoped>
.centered {
  text-align: center;
}
</style>
