import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    todo: [],
    enemy: []
  },
  mutations: {
    setUser: function (state, user) {
      state.user = Object.assign({}, state.user, user)
    },

    setTodo: function (state, todo) {
      state.todo = todo
    },

    setEnemy: function (state, enemy) {
      state.enemy = enemy
    },

    addTodo: function (state, todo) {
      state.todo.push(todo)
    },

    updateTodo: function (state, todo) {
      console.log(todo);
      
      let index = state.todo.findIndex(todo)
      state.todo.splice(index, 1, todo)
    },

    addEnemy: function (state, enemy) {
      state.enemy.push(enemy)
    }

  },
  actions: {
    
    signIn: function (context, user) {
      console.log(user);
      
      axios.post('http://localhost:3000/users/signin', user)
        .then((res) => {
          localStorage.setItem('token', res.data.token)
          // get user status
          this.$store.commit('setUser', res.data.user)
        })
        .catch((err) => {
          console.log(err)          
        })
    },

    signUp: function (context, user) {
      console.log(user)
      axios.post('http://localhost:3000/users/signup', user)
        .then((res) => {  
          localStorage.setItem('token', res.data.token)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getUser: function (context) {
      axios.post('http://localhost:3000/users/get', {
        token: localStorage.getItem('token')
      })
        .then((res) => {
          context.commit('setUser', res.data.user)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getTodo: function (context) {
      axios.post('http://localhost:3000/todos/get', {
        token: localStorage.getItem('token')
      })
        .then((res) => {
          context.commit('setTodo', res.data.todo)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getEnemy: function (context) {
      axios.get('http://localhost:3000/enemies/get')
        .then((res) => {
          context.commit('setEnemy', res.data.enemy)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    seedEnemy: function (context) {
      axios.get('http://localhost:3000/enemies/seed')
        .then((res) => {
          console.log(res.data.message)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    saveTodo: function (context, payload) {
      axios.post('http://localhost:3000/todos/add', {title: payload.todo.title, description: payload.todo.description, token: payload.token.token})
        .then((res) => {
          context.dispatch('getTodo')
        })
        .catch((err) => {
          console.log(err)
        })
    },

    updateTodo: function (context, payload) {
      let exp = context.state.user.exp + 10
      let lvl = Math.ceil(exp / 50)

      console.log(exp);

      let todo_update = {
        token: payload.token.token,
        exp: exp, 
        lvl: lvl, 
        hp: lvl * 50, 
        atk: lvl * 10,
        status: true,
        id: payload.todo._id
      }

      axios.post('http://localhost:3000/todos/status', todo_update)
        .then((res) => {
          context.dispatch('getTodo')
        })
        .catch((err) => {
          console.log(err)
        })
    },

    deleteTodo: function (context, payload) {

      axios.post('http://localhost:3000/todos/delete', {id: payload.todo._id, token: payload.token.token})
        .then((res) => {
          context.dispatch('getTodo')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
