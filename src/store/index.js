import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Product from './modules/product'
import createPersistedState from 'vuex-persistedstate'
// https://codesandbox.io/s/vuex-persistedstate-with-secure-ls-encrypted-data-7l9wb?fontsize=14&file=/index.js:328-478
// https://www.npmjs.com/package/secure-ls
// https://github.com/robinvdvleuten/vuex-persistedstate
import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { Auth, Product },
  state: {
    name: 'Bagus Tri Harjanto'
  },
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      },
      paths: ['Auth.user']
    })
  ]
})
