<template>
  <div class="product">
    <div class="centered">
      <img alt="Vue logo" src="../assets/logo.png" />
      <Navbar />
      <h1>This is Page Product</h1>
      <b-alert :show="alert">{{ isMsg }}</b-alert>
      <form>
        <input
          type="text"
          v-model="form.product_name"
          placeholder="Product Name ..."
        />
        <br />
        <input
          type="text"
          v-model="form.product_price"
          placeholder="Product Price ..."
        />
        <br />
        <input
          type="text"
          v-model="form.category_id"
          placeholder="Category Id ..."
        />
        <br />
        <input
          type="text"
          v-model="form.product_status"
          placeholder="Product Status ..."
        />
        <br />
        <button type="button" @click="postProduct()">Save</button>
        <button type="button">Update</button>
      </form>
      <hr />
      <b-container class="bv-example-row">
        <b-row>
          <b-col
            xl="3"
            lg="4"
            md="6"
            sm="12"
            v-for="(item, index) in products"
            :key="index"
          >
            <b-card
              v-bind:title="item.product_name"
              img-src="https://picsum.photos/600/300/?image=25"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 10rem;"
              class="mb-2"
            >
              <b-card-text> Rp. {{ item.product_price }} </b-card-text>

              <b-button variant="primary">Add To Cart</b-button>
              <b-button variant="success">Update</b-button>
              <b-button variant="danger" @click="deleteProduct(item.product_id)"
                >Delete</b-button
              >
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/_base/Navbar'
import axios from 'axios'

export default {
  name: 'Product',
  components: {
    Navbar
  },
  data() {
    return {
      products: [],
      form: {
        product_name: '',
        category_id: '',
        product_price: '',
        product_status: ''
      },
      alert: false,
      isMsg: ''
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      axios
        .get('http://localhost:3000/product?page=1&limit=10')
        .then(response => {
          console.log(response)
          this.products = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    postProduct() {
      console.log(this.form)
      axios
        .post('http://localhost:3000/product', this.form)
        .then(response => {
          console.log(response)
          this.alert = true
          this.isMsg = response.data.msg
          this.getProduct()
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    deleteProduct(product_id) {
      console.log(product_id)
    }
  }
}
</script>

<style scoped>
.centered {
  text-align: center;
}
</style>
