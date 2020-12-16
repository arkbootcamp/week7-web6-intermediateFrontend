<template>
  <div>
    <input type="text" :value="dataProductName" @input="changeProductName" />
    <br />
    <label>{{ dataProductName }}</label>
  </div>
</template>

<script>
export default {
  props: ['dataProductName'],
  methods: {
    changeProductName(event) {
      console.log(event.target.value)
      const changeProductName = event.target.value
      this.$emit('changeProductName', changeProductName)
    }
  }
}
</script>
