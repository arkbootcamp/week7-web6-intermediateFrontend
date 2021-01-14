import axios from 'axios'

export default {
  state: {
    limit: 3,
    page: 1,
    products: [],
    totalRows: null,
    isShow: false
  },
  mutations: {
    // tambahkan
    setProduct(state, payload) {
      // payload = response.data
      state.isShow = true
      state.products = payload.data
      state.totalRows = payload.pagination.totalData
    },
    changePage(state, payload) {
      state.page = payload
    },
    resetPages(state) {
      state.page = 1
      console.log(state.page)
    }
  },
  actions: {
    getProducts(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://localhost:3000/product?page=${context.state.page}&limit=${context.state.limit}`
          )
          .then(response => {
            console.log(response)
            context.commit('setProduct', response.data) // tambahkan
            resolve(response)
            // state.totalRows = response.data.pagination.totalData
            // state.products = response.data.data
          })
          .catch(error => {
            console.log(error.response)
            reject(error)
          })
      })
    }
  },
  getters: {
    getPageProduct(state) {
      return state.page
    },
    getLimitProduct(state) {
      return state.limit
    },
    getDataProduct(state) {
      return state.products
    },
    getTotalRowsProduct(state) {
      return state.totalRows
    },
    getShow(state) {
      return state.isShow
    }
  }
}
