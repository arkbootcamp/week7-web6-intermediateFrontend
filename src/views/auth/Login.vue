<template>
  <div>
    <h1>Halaman Login</h1>
    <h3>{{ dataName }}</h3>
    <h3>{{ name }}</h3>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <input
        type="email"
        v-model="form.user_email"
        placeholder="Input Your Email ..."
      /><br />
      <input
        type="password"
        v-model="form.user_password"
        placeholder="Input Your Password ..."
      />
      <br />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  computed: {
    // mapState & mapGetters
    // [1]
    // dataName() {
    //   return this.$store.state.name
    // }
    // [2]
    ...mapState(['name']),
    ...mapState({ dataName: 'name' })
  },
  methods: {
    // mapAction & mapMutations
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then(result => {
          console.log(result)
          this.$router.push('/')
        })
        .catch(error => {
          alert(error.data.msg)
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
    }
  }
}
</script>
