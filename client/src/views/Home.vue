<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <Profile/>        
      </div>
      <div class="col-8">
        <Todo/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Profile from '@/components/Profile.vue'
import Todo from '@/components/Todo.vue'

export default {
  name: 'home',
  components: {
    //HelloWorld
    Profile,
    Todo
  },
  data: function(){
    return {

    }
  },
  methods: {

  },
  beforeCreate: function(){
    if(!localStorage.getItem('token')){
      this.$router.push('/register')
    } else {
      this.$store.dispatch('getUser')
      this.$store.dispatch('getTodo')
      this.$store.dispatch('getEnemy')
    }
  }
}
</script>
