<template>
  <div class="lifecycle">
    <div class="centered">
      <img alt="Vue logo" src="../assets/logo.png" />
      <Navbar />
      <h1>This is Page Lifecycle</h1>
      <h3 id="message">{{ dataTesting }}</h3>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/_base/Navbar'

export default {
  name: 'Lifecycle',
  components: {
    Navbar
  },
  data() {
    return {
      dataTesting: 'Vue Data !'
    }
  },
  beforeCreate() {
    console.log('Before Created is Running ! => ' + this.dataTesting)
  },
  created() {
    console.log('Created is Running ! => ' + this.dataTesting)
  },
  beforeMount() {
    console.log('Before Mounted is Running ! => ' + this.dataTesting)
    console.log(document.getElementById('message'))
  },
  mounted() {
    console.log('Mounted is Running ! => ' + this.dataTesting)
    console.log(document.getElementById('message'))
  }
}
</script>

<style scoped>
.centered {
  text-align: center;
}
</style>
