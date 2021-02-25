import axios from 'axios'
import router from '../../router/index'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    delUser(state) {
      state.user = {}
      state.token = null
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/api1/user/login', payload)
          .then(result => {
            // console.log(result)
            context.commit('setUser', result.data.data)
            localStorage.setItem('token', result.data.data.token)
            localStorage.setItem('refreshToken', result.data.data.refreshToken)
            resolve(result)
          })
          .catch(error => {
            // console.log(error.response)
            reject(error.response)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('cart')
      context.commit('delUser')
      router.push('/login')
    },
    interceptorRequest(context) {
      console.log('interceptor request Works !')
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          // Do something before request is sent
          return config
        },
        function(error) {
          // Do something with request error
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      console.log('interceptor response Works !')
      axios.interceptors.response.use(
        function(response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response
        },
        function(error) {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          if (error.response.data.status === 403) {
            if (
              error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature' ||
              error.response.data.msg === 'jwt malformed'
            ) {
              context.dispatch('logout')
              alert(error.response.data.msg)
            } else if (error.response.data.msg === 'jwt expired') {
              const setData = {
                userId: context.state.user.user_id,
                refreshToken: localStorage.getItem('refreshToken') // atau refreshToken: context.state.user.refreshToken
              }
              axios
                .post('http://localhost:3000/api1/user/refresh', setData)
                .then(result => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('refreshToken')
                  localStorage.setItem('token', result.data.data.token)
                  localStorage.setItem(
                    'refreshToken',
                    result.data.data.refreshToken
                  )
                  context.commit('setUser', result.data.data)
                  location.reload()
                })
                .catch(error => {
                  context.dispatch('logout')
                  alert(error.response.data.msg)
                })
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    setUser(state) {
      return state.user
    },
    isLogin(state) {
      return state.token !== null
    }
  }
}
