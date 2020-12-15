<template>
  <div class="product">
    <div class="centered">
      <img alt="Vue logo" src="../assets/logo.png" />
      <Navbar />
      <h1>This is Page Product</h1>
      <form>
        <input type="text" placeholder="Product Name ..." />
        <br />
        <input type="text" placeholder="Product Price ..." />
        <br />
        <input type="text" placeholder="Category Id ..." />
        <br />
        <input type="text" placeholder="Product Status ..." />
        <br />
        <button type="submit">Save</button>
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

              <b-button href="#" variant="primary">Add To Cart</b-button>
              <b-button href="#" variant="success">Update</b-button>
              <b-button href="#" variant="danger">Delete</b-button>
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
      products: []
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      axios
        .get('http://localhost:3000/product?page=1&limit=4')
        .then(response => {
          console.log(response)
          this.products = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.centered {
  text-align: center;
}
</style>
