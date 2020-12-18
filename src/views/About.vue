<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product_id: ''
    }
  },
  created() {
    this.product_id = this.$route.params.id
    console.log(this.$route.params.id)
  },
  methods() {}
}
</script>
